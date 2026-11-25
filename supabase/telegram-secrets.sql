-- Токен бота и chat_id. Запускает хозяйка сайта, один раз:
-- Supabase → SQL Editor → New query → вставить → заменить две строки → Run.
-- Секреты хранятся в Supabase Vault и на сайт не попадают.
select vault.create_secret('ВСТАВЬ_ТОКЕН_БОТА', 'tg_bot_token');
select vault.create_secret('ВСТАВЬ_CHAT_ID', 'tg_chat_id');
