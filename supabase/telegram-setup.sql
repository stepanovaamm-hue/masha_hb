-- Ответы гостей → таблица rsvp → сообщение в Telegram-бот.
-- Запустить один раз: Supabase → SQL Editor → New query → вставить весь файл → Run.
-- Токен бота и chat_id добавляются отдельно — см. telegram-secrets.sql.

-- 1. Таблица ответов
create table if not exists public.rsvp (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 80),
  attend     text not null check (attend in ('yes', 'maybe', 'no')),
  song       text check (song is null or char_length(song) <= 200)
);

alter table public.rsvp
  add column if not exists companion text check (char_length(companion) <= 120);

-- сайт может только добавлять ответы, читать их — нет
alter table public.rsvp enable row level security;
drop policy if exists "guests can answer" on public.rsvp;
create policy "guests can answer" on public.rsvp for insert to anon with check (true);
grant insert on public.rsvp to anon;

-- 2. После каждого ответа — сообщение в Telegram
create extension if not exists pg_net;

create or replace function public.rsvp_to_telegram()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  token text := (select decrypted_secret from vault.decrypted_secrets where name = 'tg_bot_token');
  chat  text := (select decrypted_secret from vault.decrypted_secrets where name = 'tg_chat_id');
  verdict text := case new.attend
    when 'yes'   then '✅ Да, приду!'
    when 'maybe' then '🤞 Очень постараюсь'
    else              '😢 В этот раз не получится'
  end;
begin
  -- пока бот не настроен, ответ просто сохраняется в таблице
  if token is null or chat is null then
    return new;
  end if;
  perform net.http_post(
    url     := 'https://api.telegram.org/bot' || token || '/sendMessage',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body    := jsonb_build_object(
      'chat_id', chat,
      'text', '🎉 Ответ на квартирник' || chr(10) ||
              'Кто: ' || new.name || chr(10) ||
              verdict ||
              coalesce(chr(10) || 'Буду вместе с: ' || nullif(btrim(new.companion), ''), '') ||
              coalesce(chr(10) || '🎵 Песня: ' || new.song, '')
    )
  );
  return new;
end;
$$;

drop trigger if exists rsvp_to_telegram on public.rsvp;
create trigger rsvp_to_telegram
  after insert on public.rsvp
  for each row execute function public.rsvp_to_telegram();
