# LAMMI – Liga Acadêmica de Medicina Militar de Irecê

Plataforma de estudos em trauma e atendimento pré-hospitalar (APH) para alunos de medicina.

## Stack

- **React 18 + Vite 5** (TypeScript)
- **Tailwind CSS** (dark mode por classe)
- **Supabase** (Postgres + Auth + Storage)
- **React Router v6**
- **Recharts** (gráficos)
- **jsPDF + jspdf-autotable** (exportação PDF)
- **vite-plugin-pwa** (PWA + Service Worker)
- Deploy: **Vercel**

---

## Estrutura de pastas

```
src/
├── App.tsx                    # Roteamento principal
├── main.tsx                   # Entry point
├── index.css                  # Estilos globais + Tailwind
│
├── contexts/
│   └── AuthContext.tsx         # Provider global de auth
│
├── hooks/
│   ├── useAuth.ts              # Estado de autenticação
│   ├── useTheme.ts             # Dark/light mode persistido
│   ├── useTimer.ts             # Cronômetro start/stop/reset
│   ├── useSRS.ts               # Algoritmo SM-2 (Anki)
│   └── useOfflineHandler.ts    # Detecção de online/offline
│
├── services/
│   ├── supabaseClient.ts       # Cliente Supabase + tipos TypeScript
│   ├── authService.ts          # Login, cadastro, reset de senha
│   ├── profileService.ts       # CRUD de perfis e ranking
│   ├── questionsService.ts     # Banco de questões + comentários
│   ├── flashcardsService.ts    # Flashcards + estados SRS
│   ├── simuladoService.ts      # Histórico de simulados
│   ├── casesService.ts         # Casos clínicos
│   └── studyLogService.ts      # Heatmap, streak e logs
│
├── data/
│   └── mockData.ts             # Dados mock para dev (5 questões, 4 flashcards, 1 caso)
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx       # Layout raiz (sidebar + navbar + outlet)
│   │   ├── Navbar.tsx          # Barra superior + avatar + dark mode
│   │   └── Sidebar.tsx         # Navegação lateral com todos os links
│   └── common/
│       ├── ProtectedRoute.tsx  # Guard de rota (autenticado / admin)
│       ├── LoadingSpinner.tsx  # Spinner reutilizável
│       ├── ErrorMessage.tsx    # Mensagem de erro + retry
│       ├── OfflineBanner.tsx   # Banner de offline/reconexão
│       └── Heatmap.tsx         # Heatmap estilo GitHub Contributions
│
└── pages/
    ├── HomePage.tsx            # Landing + links rápidos + stats
    ├── BancoPage.tsx           # Questões + filtros + comentários + timer
    ├── FlashcardsPage.tsx      # SRS tipo Anki com flip card animado
    ├── SimuladoPage.tsx        # Config → Prova → Resultado com gráficos
    ├── CasosPage.tsx           # Lista + árvore de decisão interativa
    ├── AulasPage.tsx           # Lista de aulas com filtros
    ├── AulaDetailPage.tsx      # Detalhe com espaço para vídeo/PDF
    ├── DiretrizesPage.tsx      # Lista de diretrizes com busca
    ├── DiretrizDetailPage.tsx  # Diretriz em texto estruturado
    ├── RankingPage.tsx         # Pódio + tabela com posição do usuário
    ├── DashboardPage.tsx       # Stats + heatmap + radar + barras + histórico
    ├── SobrePage.tsx           # Institucional: missão, equipe, contato
    ├── AdminPage.tsx           # Admin: membros, questões, flashcards, PDF
    ├── NotFoundPage.tsx        # 404
    └── auth/
        ├── LoginPage.tsx           # Email/senha + Google OAuth
        ├── RegisterPage.tsx        # Cadastro
        ├── ForgotPasswordPage.tsx  # Solicitar reset
        └── ResetPasswordPage.tsx   # Nova senha (via link do email)
```

---

## Setup rápido

### 1. Clonar e instalar

```bash
git clone <seu-repo>
cd lammi
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

### 3. Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. No SQL Editor, execute todo o conteúdo de `supabase/schema.sql`
3. Em **Authentication → Providers**, habilite **Google** (configure OAuth no Google Cloud Console)
4. Em **Authentication → URL Configuration**, adicione `http://localhost:5173` aos Redirect URLs

### 4. Rodar localmente

```bash
npm run dev
```

Abra http://localhost:5173

### 5. Build para produção

```bash
npm run build
```

---

## Deploy na Vercel

1. Faça push do projeto para um repositório GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. O `vercel.json` já cuida do roteamento SPA

---

## Funcionalidades implementadas

| Módulo | Status |
|--------|--------|
| Auth (email + Google) | ✅ |
| Recuperação de senha | ✅ |
| Dark mode persistido | ✅ |
| PWA (instalável + offline) | ✅ |
| Banco de questões + filtros | ✅ |
| Comentários nas questões | ✅ (mock local) |
| Timer cronômetro | ✅ |
| Flashcards SM-2 (Anki) | ✅ |
| Simulado completo | ✅ |
| Casos clínicos interativos | ✅ |
| Heatmap estilo GitHub | ✅ |
| Streak de dias | ✅ |
| Ranking anônimo | ✅ |
| Dashboard com gráficos | ✅ |
| Admin: membros | ✅ |
| Admin: CRUD questões | ✅ |
| Admin: CRUD flashcards | ✅ |
| Exportação PDF (jsPDF) | ✅ |
| Exportação CSV | ✅ |
| Responsivo mobile | ✅ |

---

## Algoritmo SM-2 (Flashcards)

Implementado em `src/hooks/useSRS.ts`. Cada card tem:
- `ease_factor`: fator de facilidade (mín. 1.3, padrão 2.5)
- `interval`: dias até próxima revisão
- `repetitions`: acertos consecutivos
- `due_date`: data da próxima revisão

Botões de qualidade: **Errei (0)** · **Difícil (1)** · **Bom (2)** · **Fácil (3)**

---

## Temas de estudo

12 temas cobertos (enum `StudyTheme` em `supabaseClient.ts`):

```
avaliacao_cena · cinetica_trauma · atls_inicial · atls_via_aerea
atls_face · atls_pescoco · atls_toracico · atls_choque
atls_abdominal · atls_genitourinario · atls_cranioencefalico · atls_coluna
```

---

## Próximos passos

- [ ] Integrar todas as pages com Supabase real (remover mocks)
- [ ] Adicionar paginação real no Banco (`range()` do Supabase)
- [ ] Integrar comentários com tabela `question_comments`
- [ ] Editor visual de casos clínicos (drag-and-drop)
- [ ] Push notifications para lembretes de flashcards
- [ ] Modo offline com cache de questões no IndexedDB
- [ ] Upload de PDFs/vídeos via Supabase Storage
