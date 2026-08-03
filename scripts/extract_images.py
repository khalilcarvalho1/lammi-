#!/usr/bin/env python3
"""
Extrai imagens de um PDF de origem e associa cada uma à questão do banco
LAMMI (public/data/questions/**.json) que ela provavelmente ilustra.

Uso:
    python scripts/extract_images.py "C:\\Downloads\\Pericardio e Miocardio.pdf"

Como funciona a associação imagem -> questão
----------------------------------------------
O campo `source` de cada questão NUNCA contém o nome do PDF de origem (é a
banca+ano da prova real, ou fica vazio nos lotes de cursinho) — por isso a
associação não é feita cruzando nome de arquivo. Em vez disso, o texto de
cada página do PDF é comparado (sobreposição de palavras) contra o
enunciado (`statement`) de todas as questões do banco marcadas com
"ATENÇÃO" na explanation (= têm imagem pendente). Isso funciona para
qualquer PDF do banco, mesmo um cujo nome nunca foi visto antes.

Credenciais do Supabase
------------------------
Lidas de .env.local (SUPABASE_URL / VITE_SUPABASE_URL) e de
.env.secrets.local (SUPABASE_SERVICE_KEY — a service_role key, nunca a
anon key, pois é preciso criar bucket e fazer upload). Copie
.env.secrets.local.example para .env.secrets.local e preencha com a chave
do painel do Supabase (Project Settings > API > service_role secret).
Esse arquivo está no .gitignore — nunca é commitado.
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    import fitz  # pymupdf
except ImportError:
    sys.exit('Faltou instalar dependências. Rode:\n'
             '  pip install pymupdf pillow supabase python-dotenv --break-system-packages')

from dotenv import load_dotenv
from supabase import create_client

if sys.platform == 'win32':
    # o console do Windows normalmente usa cp1252/cp437, que não cobre vários
    # caracteres acentuados/símbolos do texto das questões — sem isso o script
    # quebra no meio de uma sessão interativa ao tentar exibir esse texto.
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

REPO_ROOT = Path(__file__).resolve().parent.parent
QUESTIONS_ROOT = REPO_ROOT / 'public' / 'data' / 'questions'
BUCKET = 'question-images'
MIN_DIM = 100          # ignora imagens menores que 100x100 px
# Calibrado testando contra o banco real: correspondências corretas batem
# ~1.0 quase sempre (mesmo texto de origem, não paráfrase); erradas ficaram
# na faixa 0.29-0.57 nos casos observados. 0.8 dá boa margem de segurança.
MATCH_THRESHOLD = 0.8
CONTEXT_WORDS = 50

EXT_MIME = {
    'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg',
    'gif': 'image/gif', 'bmp': 'image/bmp', 'tiff': 'image/tiff', 'tif': 'image/tiff',
}


# ─── Credenciais ─────────────────────────────────────────────────────────

def load_credentials() -> tuple[str, str]:
    load_dotenv(REPO_ROOT / '.env.local')
    load_dotenv(REPO_ROOT / '.env.secrets.local')
    url = os.environ.get('SUPABASE_URL') or os.environ.get('VITE_SUPABASE_URL')
    key = os.environ.get('SUPABASE_SERVICE_KEY')
    missing = []
    if not url:
        missing.append('SUPABASE_URL (ou VITE_SUPABASE_URL, já deveria estar em .env.local)')
    if not key:
        missing.append('SUPABASE_SERVICE_KEY')
    if missing:
        print('Faltam credenciais do Supabase:')
        for m in missing:
            print(f'  - {m}')
        print()
        print('Copie scripts/.env.secrets.local.example para .env.secrets.local (raiz do')
        print('projeto) e preencha SUPABASE_SERVICE_KEY com a service_role key do painel')
        print('do Supabase (Project Settings > API > service_role secret).')
        print('NUNCA cole essa chave em nenhum arquivo versionado no git.')
        sys.exit(1)
    return url, key


# ─── Índice de questões ──────────────────────────────────────────────────

def load_all_questions() -> tuple[dict, list, dict]:
    """Retorna (id_index, attention_pool, by_file).
    id_index: {id: {'file': Path, 'idx': int}} para TODAS as questões do banco
      (permite reassociar uma imagem a qualquer id, não só aos já marcados).
    attention_pool: lista de dicts das questões com "ATENÇÃO" na explanation,
      usada como pool principal de sugestão automática por similaridade de texto.
    by_file: {Path: [dicts...]} com TODAS as questões de cada arquivo, no mesmo
      formato do attention_pool — usado como pool auxiliar (ver ampliar_pool),
      porque algumas questões referenciam imagem no PDF sem terem sido
      marcadas com ATENÇÃO na extração original (achado confirmado testando
      este script contra o banco real: brady_018 é um caso exato disso).
    """
    id_index: dict[str, dict] = {}
    attention_pool: list[dict] = []
    by_file: dict[Path, list] = {}
    for path in QUESTIONS_ROOT.rglob('*.json'):
        try:
            data = json.loads(path.read_text(encoding='utf-8'))
        except Exception:
            continue
        questions = data.get('questions', [])
        for i, q in enumerate(questions):
            qid = q.get('id')
            if not qid:
                continue
            id_index[qid] = {'file': path, 'idx': i}
            entry = {
                'id': qid, 'file': path, 'idx': i,
                'statement': q.get('statement', ''),
                'correct_key': q.get('correct_key'),
                'alternatives': q.get('alternatives', []),
            }
            by_file.setdefault(path, []).append(entry)
            if 'ATENÇÃO' in (q.get('explanation') or ''):
                attention_pool.append(entry)
    return id_index, attention_pool, by_file


_IMAGE_CUE_RE = re.compile(
    r'\b(ecg|eletrocardiogr|tra[çc]ado|imagem|figura|radiografia|\brx\b|'
    r'tomografia|\btc\b|resson[âa]nc|\brm\b|fotografia|\bfoto\b|ultrassom|'
    r'ecocardiogr|gr[áa]fico|reproduzid[oa])',
    re.IGNORECASE,
)


def looks_image_dependent(statement: str) -> bool:
    return bool(_IMAGE_CUE_RE.search(statement or ''))


def widen_pool(base_pool: list[dict], inferred_files: set, by_file: dict) -> list[dict]:
    """Amplia o pool de candidatos com as demais questões dos arquivos já
    inferidos neste run — mas só as que mencionam algum indício de imagem no
    próprio enunciado. Sem esse filtro, uma questão curta e puramente
    teórica (ex.: "qual destas drogas não causa bradicardia?") pode "vencer"
    por coincidência: seu texto inteiro cabe em qualquer página que o
    contenha, dando pontuação 1.0 mesmo sem ter nada a ver com a imagem."""
    if not inferred_files:
        return base_pool
    seen_ids = {q['id'] for q in base_pool}
    widened = list(base_pool)
    for path in inferred_files:
        for q in by_file.get(path, []):
            if q['id'] not in seen_ids and looks_image_dependent(q['statement']):
                seen_ids.add(q['id'])
                widened.append(q)
    return widened


# ─── Correspondência texto-a-texto ───────────────────────────────────────

_WORD_RE = re.compile(r'[^a-zà-öø-ÿ0-9\s]')


def normalize_words(text: str) -> list[str]:
    text = (text or '').lower()
    text = _WORD_RE.sub(' ', text)
    return [w for w in text.split() if len(w) > 3]


def match_score(page_text: str, statement: str) -> float:
    """Fração das palavras distintivas do enunciado que aparecem na página —
    como é literalmente o mesmo texto de origem (não uma paráfrase), um
    enunciado que está de fato naquela página tende a pontuar muito mais
    alto que os demais."""
    stmt_words = normalize_words(statement)
    if not stmt_words:
        return 0.0
    page_set = set(normalize_words(page_text))
    stmt_set = set(stmt_words)
    return len(page_set & stmt_set) / len(stmt_set)


def best_match(page_text: str, pool: list[dict]) -> tuple[dict | None, float]:
    if not pool:
        return None, 0.0
    scored = [(q, match_score(page_text, q['statement'])) for q in pool]
    scored.sort(key=lambda t: t[1], reverse=True)
    return scored[0]


def get_context_snippet(page, xref: int, target_words: int = CONTEXT_WORDS) -> str:
    try:
        rects = page.get_image_rects(xref)
    except Exception:
        rects = []
    blocks = [b for b in page.get_text('blocks') if isinstance(b[4], str) and b[4].strip()]
    if not blocks:
        return ''
    if rects:
        y_mid = (rects[0].y0 + rects[0].y1) / 2
        blocks.sort(key=lambda b: abs(((b[1] + b[3]) / 2) - y_mid))
    picked, word_count = [], 0
    for b in blocks:
        picked.append(b)
        word_count += len(b[4].split())
        if word_count >= target_words:
            break
    picked.sort(key=lambda b: b[1])  # ordem vertical original, de volta
    text = ' '.join(b[4].strip() for b in picked)
    return ' '.join(text.split()[:target_words])


# ─── Persistência das questões ───────────────────────────────────────────

_json_cache: dict[Path, dict] = {}


def get_question_file(path: Path) -> dict:
    if path not in _json_cache:
        _json_cache[path] = json.loads(path.read_text(encoding='utf-8'))
    return _json_cache[path]


def save_question_file(path: Path) -> None:
    data = _json_cache[path]
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


_ATENCAO_RE = re.compile(r'\s*ATEN[CÇ]ÃO\s*:?\s*[^.–—]*[.–—]+\s*', re.IGNORECASE)


def strip_atencao(explanation: str) -> str:
    if not explanation or 'ATENÇÃO' not in explanation:
        return explanation
    cleaned = _ATENCAO_RE.sub(' ', explanation).strip()
    if cleaned and cleaned[0].islower():
        cleaned = cleaned[0].upper() + cleaned[1:]
    return cleaned


def apply_update(id_index: dict, qid: str, image_url: str, new_key: str | None,
                  modified_files: set[Path]) -> bool:
    entry = id_index.get(qid)
    if entry is None:
        print(f'  ✗ id "{qid}" não encontrado no banco.')
        return False
    data = get_question_file(entry['file'])
    q = data['questions'][entry['idx']]
    if q.get('image_url'):
        print(f'  ⚠ {qid} já tinha image_url — sobrescrevendo com a nova imagem.')
    q['image_url'] = image_url
    q['explanation'] = strip_atencao(q.get('explanation', ''))
    q['reviewed'] = True
    if new_key:
        q['correct_key'] = new_key
    save_question_file(entry['file'])
    modified_files.add(entry['file'])
    return True


# ─── Supabase Storage ─────────────────────────────────────────────────────

def ensure_bucket(client) -> None:
    buckets = client.storage.list_buckets()
    if any(b.name == BUCKET for b in buckets):
        return
    print(f'Bucket "{BUCKET}" não existe — criando (público)...')
    client.storage.create_bucket(id=BUCKET, options={'public': True})


def upload_image(client, path_in_bucket: str, image_bytes: bytes, ext: str) -> str:
    mime = EXT_MIME.get(ext.lower(), 'application/octet-stream')
    client.storage.from_(BUCKET).upload(
        path_in_bucket, image_bytes,
        file_options={'content-type': mime, 'upsert': 'true'},
    )
    return client.storage.from_(BUCKET).get_public_url(path_in_bucket)


# ─── Fluxo principal ──────────────────────────────────────────────────────

def main() -> None:
    if len(sys.argv) < 2:
        sys.exit('Uso: python scripts/extract_images.py "caminho/para/arquivo.pdf"')
    pdf_path = Path(sys.argv[1])
    if not pdf_path.exists():
        sys.exit(f'Arquivo não encontrado: {pdf_path}')

    url, key = load_credentials()
    client = create_client(url, key)
    ensure_bucket(client)

    print(f'Carregando questões de {QUESTIONS_ROOT} ...')
    id_index, attention_pool, by_file = load_all_questions()
    print(f'{len(id_index)} questões no banco, {len(attention_pool)} com ATENÇÃO (imagem pendente).\n')
    inferred_files: set[Path] = set()

    doc = fitz.open(pdf_path)

    # Coleta todas as imagens >= MIN_DIM x MIN_DIM, com o texto da página já
    # extraído (para reaproveitar no match e no snippet de contexto).
    collected = []
    for page_index in range(len(doc)):
        page = doc[page_index]
        page_text = page.get_text()
        seen_xrefs = set()
        for img in page.get_images(full=True):
            xref = img[0]
            if xref in seen_xrefs:
                continue
            seen_xrefs.add(xref)
            try:
                base = doc.extract_image(xref)
            except Exception:
                continue
            if base['width'] < MIN_DIM or base['height'] < MIN_DIM:
                continue
            # imagens sem retângulo de posição não estão de fato desenhadas em
            # nenhum lugar visível da página — em vários PDFs deste banco isso
            # acontece com um recurso "órfão" do tamanho da página inteira,
            # repetido em cada página, que não é a figura clínica real.
            if not page.get_image_rects(xref):
                continue
            collected.append({
                'page_index': page_index, 'page': page, 'page_text': page_text,
                'xref': xref, 'ext': base['ext'], 'bytes': base['image'],
            })

    total = len(collected)
    if total == 0:
        print('Nenhuma imagem >= 100x100px encontrada neste PDF.')
        return
    print(f'{total} imagens encontradas (>= {MIN_DIM}x{MIN_DIM}px).\n')

    stats = {'updated': 0, 'skipped': 0}
    modified_files: set[Path] = set()
    tmp_dir = Path(tempfile.mkdtemp(prefix='lammi_extract_'))

    for i, item in enumerate(collected, start=1):
        page_index, page, page_text = item['page_index'], item['page'], item['page_text']
        ext, img_bytes, xref = item['ext'], item['bytes'], item['xref']

        tmp_path = tmp_dir / f'imagem_{i}_pagina_{page_index + 1}.{ext}'
        tmp_path.write_bytes(img_bytes)
        os.startfile(tmp_path)  # abre no visualizador padrão do Windows

        context = get_context_snippet(page, xref)
        pool_now = widen_pool(attention_pool, inferred_files, by_file)
        candidate, score = best_match(page_text, pool_now)

        print(f'=== Imagem {i}/{total} — Página {page_index + 1} ===')
        print('[imagem aberta no visualizador padrão]\n')
        if context:
            print(f'Contexto da página (~{CONTEXT_WORDS} palavras): "{context}"\n')

        if candidate is None:
            print('Nenhuma questão para sugerir automaticamente — digite um id ou "s" para pular.\n')
        else:
            baixa_confianca = score < MATCH_THRESHOLD
            confianca = 'BAIXA CONFIANÇA — confira com atenção antes de aceitar' if baixa_confianca else f'{round(score * 100)}% de sobreposição de texto'
            print(f'Questão mais provável: {candidate["id"]}  ({confianca})')
            print(f'Enunciado completo: "{candidate["statement"]}"')
            print(f'Gabarito atual: {(candidate["correct_key"] or "?").upper()}\n')

        print('[Enter] confirmar | [ID diferente] corrigir questão | [letra A-E] corrigir gabarito | [s] skip')
        target_id = candidate['id'] if candidate else None
        new_key = None

        while True:
            try:
                resp = input('> ').strip()
            except (EOFError, KeyboardInterrupt):
                print('\nInterrompido pelo usuário.')
                _finish(doc, stats, modified_files, pdf_path)
                return

            if resp == '':
                if target_id is None:
                    print('Não há questão sugerida — digite um id ou "s" para pular.')
                    continue
                break
            if resp.lower() == 's':
                target_id = None
                break
            if len(resp) == 1 and resp.upper() in 'ABCDE':
                if target_id is None:
                    print('Não há questão-alvo definida ainda — digite um id primeiro, ou "s" para pular.')
                    continue
                letra = resp.lower()
                alt_keys = {a.get('key', '').lower() for a in id_index_alternatives(id_index, target_id)}
                if alt_keys and letra not in alt_keys:
                    print(f'  "{letra}" não é uma alternativa válida desta questão ({sorted(alt_keys)}). Tente de novo.')
                    continue
                new_key = letra
                break
            # senão, tratamos como um id
            if resp not in id_index:
                print(f'  id "{resp}" não encontrado no banco. Tente de novo, ou "s" para pular.')
                continue
            target_id = resp
            break

        if target_id is None:
            print('  → pulada.\n')
            stats['skipped'] += 1
            continue

        path_in_bucket = f'{target_id}_p{page_index + 1}_{i}.{ext}'
        image_url = upload_image(client, path_in_bucket, img_bytes, ext)
        ok = apply_update(id_index, target_id, image_url, new_key, modified_files)
        if ok:
            print(f'  ✓ {target_id} atualizada — {image_url}\n')
            stats['updated'] += 1
            # confirmação humana (aceitou ou corrigiu) é o melhor sinal possível
            # de que este arquivo pertence a este PDF — amplia o pool para as
            # próximas imagens incluir todas as questões dele, não só as ATENÇÃO.
            inferred_files.add(id_index[target_id]['file'])
        else:
            stats['skipped'] += 1

    _finish(doc, stats, modified_files, pdf_path)


def id_index_alternatives(id_index: dict, qid: str) -> list[dict]:
    entry = id_index.get(qid)
    if not entry:
        return []
    data = get_question_file(entry['file'])
    return data['questions'][entry['idx']].get('alternatives', [])


def _finish(doc, stats: dict, modified_files: set[Path], pdf_path: Path) -> None:
    doc.close()
    print('=== Resumo ===')
    print(f'Imagens processadas: {stats["updated"] + stats["skipped"]}')
    print(f'Questões atualizadas: {stats["updated"]}')
    print(f'Puladas: {stats["skipped"]}')

    if not modified_files:
        print('\nNenhuma alteração — pulando manifest/commit/push.')
        return

    print('\nRegenerando manifest...')
    subprocess.run(['node', 'scripts/build-manifest.mjs'], cwd=REPO_ROOT, check=True)

    files_to_add = sorted(str(p.relative_to(REPO_ROOT)) for p in modified_files)
    files_to_add.append('public/data/manifest.json')
    # nunca deixa um arquivo .env* entrar aqui, mesmo por engano
    files_to_add = [f for f in files_to_add if not Path(f).name.startswith('.env')]

    subprocess.run(['git', 'add', *files_to_add], cwd=REPO_ROOT, check=True)
    commit_msg = (
        f'feat: adiciona {stats["updated"]} imagem(ns) de "{pdf_path.name}" ao banco de questões\n\n'
        f'Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>'
    )
    subprocess.run(['git', 'commit', '-m', commit_msg], cwd=REPO_ROOT, check=True)
    subprocess.run(['git', 'push'], cwd=REPO_ROOT, check=True)
    print('Commit e push concluídos.')


if __name__ == '__main__':
    main()
