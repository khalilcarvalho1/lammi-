-- ============================================================
-- LAMMI – Schema Supabase (PostgreSQL)
-- Execute no SQL Editor do Supabase
-- ============================================================

-- ─── Extensions ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles ─────────────────────────────────────────────────
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text not null,
  display_name    text not null default '',
  nickname        text not null default '',
  avatar_url      text,
  role            text not null default 'member' check (role in ('admin','member')),
  active          boolean not null default true,
  score           integer not null default 0,
  study_streak    integer not null default 0,
  last_study_date date,
  created_at      timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
create policy "Public read" on public.profiles for select using (true);
create policy "Own update" on public.profiles for update using (auth.uid() = id);

-- Trigger: criar profile ao criar usuário
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, display_name, nickname)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email,'@',1)),
    'Médico' || floor(random()*9000+1000)::text
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Questions ────────────────────────────────────────────────
create table public.questions (
  id            uuid primary key default uuid_generate_v4(),
  statement     text not null,
  alternatives  jsonb not null,   -- [{key, text}]
  correct_key   text not null,
  explanation   text not null default '',
  theme         text not null,
  difficulty    text not null default 'medio' check (difficulty in ('facil','medio','dificil')),
  created_by    uuid references public.profiles(id),
  created_at    timestamptz not null default now()
);

alter table public.questions enable row level security;
create policy "Public read questions" on public.questions for select using (true);
create policy "Admin insert/update/delete questions" on public.questions
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Question Comments ────────────────────────────────────────
create table public.question_comments (
  id            uuid primary key default uuid_generate_v4(),
  question_id   uuid not null references public.questions(id) on delete cascade,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  content       text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.question_comments enable row level security;
create policy "Public read comments" on public.question_comments for select using (true);
create policy "Own insert comments" on public.question_comments for insert with check (auth.uid() = user_id);
create policy "Own update/delete comments" on public.question_comments for update using (auth.uid() = user_id);
create policy "Own delete comments" on public.question_comments for delete using (auth.uid() = user_id);

-- ─── User Question Progress ───────────────────────────────────
create table public.user_question_progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  question_id   uuid not null references public.questions(id) on delete cascade,
  chosen_key    text not null,
  correct       boolean not null,
  answered_at   timestamptz not null default now(),
  unique (user_id, question_id)
);

alter table public.user_question_progress enable row level security;
create policy "Own progress" on public.user_question_progress for all using (auth.uid() = user_id);

-- ─── Flashcards ───────────────────────────────────────────────
create table public.flashcards (
  id          uuid primary key default uuid_generate_v4(),
  front       text not null,
  back        text not null,
  theme       text not null,
  created_by  uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

alter table public.flashcards enable row level security;
create policy "Public read flashcards" on public.flashcards for select using (true);
create policy "Admin manage flashcards" on public.flashcards
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── User Flashcard SRS ───────────────────────────────────────
create table public.user_flashcards (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  flashcard_id  uuid not null references public.flashcards(id) on delete cascade,
  ease_factor   float not null default 2.5,
  interval      integer not null default 1,
  repetitions   integer not null default 0,
  due_date      date not null default current_date + 1,
  unique (user_id, flashcard_id)
);

alter table public.user_flashcards enable row level security;
create policy "Own flashcard srs" on public.user_flashcards for all using (auth.uid() = user_id);

-- ─── Simulados ────────────────────────────────────────────────
create table public.simulados (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  themes           text[] not null,
  total_questions  integer not null,
  correct_count    integer not null default 0,
  time_seconds     integer not null default 0,
  started_at       timestamptz not null default now(),
  finished_at      timestamptz,
  question_results jsonb not null default '[]'
);

alter table public.simulados enable row level security;
create policy "Own simulados" on public.simulados for all using (auth.uid() = user_id);

-- ─── Clinical Cases ───────────────────────────────────────────
create table public.clinical_cases (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  theme       text not null,
  steps       jsonb not null default '[]',
  created_by  uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

alter table public.clinical_cases enable row level security;
create policy "Public read cases" on public.clinical_cases for select using (true);
create policy "Admin manage cases" on public.clinical_cases
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Aulas ────────────────────────────────────────────────────
create table public.aulas (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  theme       text not null,
  type        text not null check (type in ('video','pdf','slide','texto')),
  content_url text,
  content     text,
  created_by  uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

alter table public.aulas enable row level security;
create policy "Public read aulas" on public.aulas for select using (true);
create policy "Admin manage aulas" on public.aulas
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Diretrizes ───────────────────────────────────────────────
create table public.diretrizes (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  summary     text not null,
  content     text not null default '',
  theme       text not null,
  source_url  text,
  created_by  uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

alter table public.diretrizes enable row level security;
create policy "Public read diretrizes" on public.diretrizes for select using (true);
create policy "Admin manage diretrizes" on public.diretrizes
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Study Logs (heatmap + streak) ───────────────────────────
create table public.study_logs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  activity_type text not null check (activity_type in ('question','flashcard','simulado','case')),
  theme         text,
  date          date not null default current_date,
  count         integer not null default 1
);

alter table public.study_logs enable row level security;
create policy "Own study logs" on public.study_logs for all using (auth.uid() = user_id);

-- Índice para consultas de heatmap
create index study_logs_user_date_idx on public.study_logs (user_id, date);

-- ─── Função: Ranking ─────────────────────────────────────────
-- Retorna ranking dos 50 usuários mais ativos com desempate por total de logs
create or replace function public.get_ranking()
returns table (
  id           uuid,
  nickname     text,
  score        integer,
  study_streak integer,
  rank_position bigint
) language sql security definer as $$
  select
    p.id,
    p.nickname,
    p.score,
    p.study_streak,
    row_number() over (order by p.score desc, coalesce(log_count.total, 0) desc) as rank_position
  from public.profiles p
  left join (
    select user_id, sum(count) as total from public.study_logs group by user_id
  ) log_count on log_count.user_id = p.id
  where p.active = true
  order by rank_position
  limit 50;
$$;
