const musicToggle = document.querySelector('.music-toggle');
const musicLabel = musicToggle.querySelector('.music-label');
const musicPlayer = document.getElementById('music-player');
const musicFrame = musicPlayer.querySelector('iframe');
const musicHide = musicPlayer.querySelector('.music-player-hide');
const toast = document.querySelector('.egg-toast');
const toastText = toast.querySelector('.egg-message');
const songLink = toast.querySelector('.egg-song');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let toastTimer;

function closeToast() {
  clearTimeout(toastTimer);
  toast.hidden = true;
}

function say(message, withSongLink = false) {
  clearTimeout(toastTimer);
  toastText.textContent = message;
  songLink.hidden = !withSongLink;
  toast.hidden = false;
  if (!withSongLink) toastTimer = setTimeout(closeToast, 5000);
}

function loadMusicPlayer() {
  if (!musicFrame.hasAttribute('src')) musicFrame.src = musicFrame.dataset.src;
}

function showMusicPlayer(open) {
  musicPlayer.inert = !open;
  musicToggle.setAttribute('aria-expanded', String(open));
  musicLabel.textContent = open ? 'Скрыть плеер' : 'Включить музыку';
  if (open) loadMusicPlayer();
  (open ? musicHide : musicToggle).focus({preventScroll:true});
}

musicToggle.hidden = false;
window.addEventListener('load', loadMusicPlayer, {once:true});
musicToggle.addEventListener('click', () => showMusicPlayer(musicPlayer.inert));
musicHide.addEventListener('click', () => showMusicPlayer(false));
musicPlayer.addEventListener('keydown', event => {
  if (event.key === 'Escape') showMusicPlayer(false);
});

toast.querySelector('button').addEventListener('click', closeToast);
songLink.addEventListener('click', event => {
  event.preventDefault();
  const field = document.querySelector(matchMedia('(max-width: 1100px)').matches ? '#m-song' : '#d-song');
  closeToast();
  if (!field) return;
  field.focus({preventScroll:true});
  field.scrollIntoView({block:'center',behavior:reduceMotion.matches ? 'instant' : 'smooth'});
});

function discoGlints(button) {
  if (reduceMotion.matches) return;
  const field = document.createElement('span');
  field.className = 'ball-glints';
  field.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 8; index += 1) {
    const ray = document.createElement('i');
    const angle = (index / 8) * Math.PI * 2;
    const distance = index % 2 === 0 ? 95 : 65;
    ray.style.setProperty('--glint-x', Math.round(distance * Math.cos(angle)) + 'px');
    ray.style.setProperty('--glint-y', Math.round(distance * Math.sin(angle)) + 'px');
    field.appendChild(ray);
  }
  button.querySelector('.ball-glints')?.remove();
  button.appendChild(field);
  button.classList.add('effect');
  setTimeout(() => {
    field.remove();
    if (!button.querySelector('.ball-glints')) button.classList.remove('effect');
  }, 900);
}

for (const button of document.querySelectorAll('.egg')) {
  button.addEventListener('click', () => {
    switch (button.dataset.egg) {
      case 'candles': {
        const glow = button.getAttribute('aria-pressed') !== 'true';
        button.setAttribute('aria-pressed', String(glow));
        say(glow ? 'Свечи горят. Загадывай желание!' : 'Успели загадать?');
        break;
      }
      case 'microphone':
        say('Микрофон включён. Какую песню ставим?', true);
        break;
      case 'stamp':
        button.setAttribute('data-stamped', '');
        say('Доставлено лично · 07.12');
        break;
      case 'music-ball':
        discoGlints(button);
        break;
      case 'wink':
        if (button.classList.contains('is-winking')) break;
        button.classList.add('is-winking');
        setTimeout(() => button.classList.remove('is-winking'), 460);
        break;
    }
  });
}
