# Маша · birthday residency

Сайт-приглашение на гаражный квартирник 7 декабря 2026, Garage du funk, Пермь.

Статичный сайт: `index.html` + картинки в `img/`. Ответы гостей уходят в Supabase (таблица `rsvp`), оттуда триггер сразу пересылает их сообщением в Telegram-бот. Настройка — один раз запустить в SQL Editor `supabase/telegram-setup.sql`, а затем `supabase/telegram-secrets.sql` со своим токеном бота и chat_id.
Публикуется через GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.
