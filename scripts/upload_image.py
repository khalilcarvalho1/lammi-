#!/usr/bin/env python3
"""
Associa manualmente uma imagem (já salva no computador) a uma questão
específica do banco — para os casos em que o PDF de origem não trazia a
imagem embutida (ex.: prints de página web) e a figura precisa ser
recuperada à mão a partir do site original.

Uso:
    python scripts/upload_image.py <id_da_questao> "<caminho_da_imagem>"

Ex.:
    python scripts/upload_image.py sca_023 "C:\\Downloads\\ecg_sca023.png"

Faz: upload da imagem no Supabase Storage (bucket question-images),
atualização do JSON (image_url, remove a nota ATENÇÃO da explanation,
marca reviewed:true), regeneração do manifest, e commit + push.

Credenciais em .env.local / .env.secrets.local — mesmo esquema de
scripts/extract_images.py (reaproveitado aqui como módulo).
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import extract_images as ei  # noqa: E402
from supabase import create_client  # noqa: E402


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit('Uso: python scripts/upload_image.py <id_da_questao> "<caminho_da_imagem>"')

    qid = sys.argv[1]
    img_path = Path(sys.argv[2])
    if not img_path.exists():
        sys.exit(f'Arquivo não encontrado: {img_path}')

    ext = (img_path.suffix.lstrip('.') or 'png').lower()

    print(f'Carregando questões de {ei.QUESTIONS_ROOT} ...')
    id_index, _, _ = ei.load_all_questions()
    if qid not in id_index:
        sys.exit(f'id "{qid}" não encontrado no banco.')

    url, key = ei.load_credentials()
    client = create_client(url, key)
    ei.ensure_bucket(client)

    img_bytes = img_path.read_bytes()
    path_in_bucket = f'{qid}_manual.{ext}'
    image_url = ei.upload_image(client, path_in_bucket, img_bytes, ext)
    print(f'Upload ok: {image_url}')

    modified_files: set[Path] = set()
    ok = ei.apply_update(id_index, qid, image_url, None, modified_files)
    if not ok:
        sys.exit('Falha ao atualizar a questão.')
    print(f'✓ {qid} atualizada (image_url + ATENÇÃO removida + reviewed:true)')

    print('Regenerando manifest...')
    subprocess.run(['node', 'scripts/build-manifest.mjs'], cwd=ei.REPO_ROOT, check=True)

    files_to_add = sorted(str(p.relative_to(ei.REPO_ROOT)) for p in modified_files)
    files_to_add.append('public/data/manifest.json')
    files_to_add = [f for f in files_to_add if not Path(f).name.startswith('.env')]

    subprocess.run(['git', 'add', *files_to_add], cwd=ei.REPO_ROOT, check=True)
    commit_msg = (
        f'feat: adiciona imagem manual para {qid}\n\n'
        f'Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>'
    )
    result = subprocess.run(['git', 'commit', '-m', commit_msg], cwd=ei.REPO_ROOT)
    if result.returncode != 0:
        print('Nada para commitar (ou erro no commit) — verifique git status.')
        return
    subprocess.run(['git', 'push'], cwd=ei.REPO_ROOT, check=True)
    print('Commit e push concluídos.')


if __name__ == '__main__':
    main()
