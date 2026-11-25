(() => {
  const windows = [
    '161,352 271,352 271,556 161,565',
    '295,352 738,352 738,564 295,564',
    '161,585 272,585 272,738 161,738',
    '295,585 492,585 492,744 295,744',
    '515,585 738,585 738,744 515,744',
    '1036,405 1140,381 1140,620 1036,609',
    '1036,637 1140,650 1140,798 1036,775',
    '1164,380 1228,380 1228,781 1164,781',
    '1254,380 1486,380 1486,781 1254,781',
    '1508,380 1580,380 1580,613 1508,613',
    '1508,634 1580,634 1580,776 1508,776',
    '1594,380 1617,380 1617,781 1594,781',
  ];
  const bulbs = [
    [69,249],[104,274],[148,282],[191,272],[218,250],[250,256],[287,275],[335,278],
    [373,258],[403,239],[437,262],[481,278],[531,283],[578,275],[620,255],[646,235],
    [677,241],[712,263],[754,278],[802,283],[850,275],[890,256],[922,235],[959,255],
    [994,274],[1045,282],[1095,275],[1138,255],[1167,235],[1193,254],[1230,275],[1276,282],
    [1328,275],[1359,254],[1388,235],[1416,253],[1453,272],[1500,282],[1548,276],[1580,256],
    [1608,236],[1635,258],[1680,277],
  ];

  function garageSvg(id, facade, silhouettes, standalone = false) {
    const label = (key, name) => `id="${id}-${key}" inkscape:groupmode="layer" inkscape:label="${name}"`;
    const windowsPolygon = windows.map(points => `<polygon points="${points}"/>`).join('');
    const bulbShades = bulbs.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="5.4" fill="#5b5042"/>`).join('');
    const bulbGlows = bulbs.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="21" fill="url(#${id}-glow)"/><circle cx="${x}" cy="${y}" r="4.3" fill="#fff2bf"/>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 1774 887" width="1774" height="887" role="img" aria-label="Гараж с мятной дверью, светом в окнах и гирляндой">
      <defs>
        <clipPath id="${id}-windows">${windowsPolygon}</clipPath>
        <filter id="${id}-ink" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 .14  0 0 0 0 .09  0 0 0 0 .10  -.2126 -.7152 -.0722 0 1"/>
          <feComponentTransfer><feFuncA type="linear" slope="1.12" intercept="-.12"/></feComponentTransfer>
          <feComposite operator="in" in2="SourceGraphic"/>
        </filter>
        <radialGradient id="${id}-glow">
          <stop stop-color="#ffe592" stop-opacity=".55"/>
          <stop offset="1" stop-color="#ffd470" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${id}-reflection" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop stop-color="#ffedc8" stop-opacity="0"/>
          <stop offset=".47" stop-color="#ffedc8" stop-opacity=".14"/>
          <stop offset=".53" stop-color="#ffedc8" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${standalone ? `<g ${label('facade','01 · Фасад и интерьер')}>
        <image href="${facade}" width="1774" height="887"/>
      </g>` : ''}
      <g ${label('window-dim','02 · Затемнение окон')} class="garage-art__off" ${standalone ? 'style="display:none"' : ''}>
        <rect width="1774" height="887" fill="#162637" opacity=".81" clip-path="url(#${id}-windows)"/>
      </g>
      <g ${label('guests','03 · Гости за стеклом')} class="garage-art__on garage-art__guests" clip-path="url(#${id}-windows)" opacity=".89">
        <image href="${silhouettes[0]}" x="317" y="511" width="202" height="229" filter="url(#${id}-ink)"/>
        <image href="${silhouettes[1]}" x="518" y="421" width="205" height="333" filter="url(#${id}-ink)"/>
        <image href="${silhouettes[2]}" x="1233" y="489" width="214" height="214" filter="url(#${id}-ink)"/>
        <image href="${silhouettes[3]}" x="1453" y="475" width="175" height="175" filter="url(#${id}-ink)"/>
      </g>
      <g ${label('glass','04 · Отражения')} class="garage-art__on" clip-path="url(#${id}-windows)">
        <rect x="160" y="347" width="580" height="410" fill="url(#${id}-reflection)"/>
        <rect x="1034" y="378" width="590" height="421" fill="url(#${id}-reflection)" opacity=".65"/>
      </g>
      <g ${label('bulbs-off','05 · Выключенные лампочки')} class="garage-art__off" ${standalone ? 'style="display:none"' : ''}>${bulbShades}</g>
      <g ${label('bulbs-on','06 · Свет гирлянды')} class="garage-art__on">${bulbGlows}</g>
    </svg>`;
  }

  if (typeof module === 'object' && module.exports) {
    module.exports = { garageSvg };
    return;
  }

  const silhouettes = [1,2,3,4].map(index => `img/garage-silhouette-${index}.webp`);
  const silhouetteImages = silhouettes.map(src => {
    const img = new Image();
    img.src = src;
    return img.decode();
  });
  const guestsReady = Promise.allSettled(silhouetteImages).then(images => images.every(image => image.status === 'fulfilled'));
  for (const scene of document.querySelectorAll('.garage-art')) {
    const button = scene.querySelector('button');
    let chosen = false;
    let lit = false;
    const picture = scene.querySelector('.garage-art__picture');
    picture.insertAdjacentHTML('beforeend', garageSvg(scene.id, '', silhouettes));
    guestsReady.then(ready => { if (ready) scene.classList.add('has-silhouettes'); });
    const arrival = document.createElement('span');
    arrival.className = 'garage-art__arrival';
    arrival.textContent = 'Свои уже здесь';
    arrival.hidden = true;
    picture.append(arrival);
    let arrivalTimer;
    button.hidden = false;
    function showLights(next) {
      lit = next;
      scene.dataset.lit = String(lit);
      button.setAttribute('aria-pressed', String(lit));
      button.querySelector('.garage-art__status').textContent = lit ? 'Свет включён' : 'Свет выключен';
      clearTimeout(arrivalTimer);
      arrival.hidden = !lit;
      if (lit) arrivalTimer = setTimeout(() => { arrival.hidden = true; }, 4200);
    }
    showLights(false);
    button.addEventListener('click', () => {
      chosen = true;
      showLights(!lit);
    });
    if (!('IntersectionObserver' in window)) {
      showLights(true);
      continue;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (!chosen) showLights(true);
        observer.disconnect();
      }
    }, {threshold:.3, rootMargin:'0px 0px -12% 0px'});
    observer.observe(scene);
  }
})();
