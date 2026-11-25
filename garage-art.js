(() => {
  const windows = [
    '158,337 270,337 270,342 179,342 162,566 158,566',
    '193,366 268,366 270,557 178,557',
    '291,350 740,350 740,565 293,568',
    '159,582 274,582 275,743 159,743',
    '293,582 493,581 494,745 295,744',
    '512,581 740,580 740,746 513,745',
    '1033,377 1087,377 1033,387',
    '1033,402 1142,378 1142,626 1034,621',
    '1034,632 1142,639 1143,788 1034,775',
    '1160,377 1229,377 1234,781 1160,781',
    '1251,378 1484,378 1490,781 1256,781',
    '1506,379 1582,379 1583,620 1509,620',
    '1510,634 1583,634 1585,781 1513,781',
    '1592,378 1620,378 1620,620 1593,620',
    '1593,634 1620,634 1621,781 1593,781',
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
    const panes = windows.map(points => `<polygon points="${points}"/>`).join('');
    const bulbShades = bulbs.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="5.4" fill="#5b5042"/>`).join('');
    const bulbGlows = bulbs.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="21" fill="url(#${id}-glow)"/><circle cx="${x}" cy="${y}" r="4.3" fill="#fff2bf"/>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 1774 887" width="1774" height="887" role="img" aria-label="Гараж с мятной дверью, светом в окнах и гирляндой">
      <defs>
        <mask id="${id}-windows" maskUnits="userSpaceOnUse" x="0" y="0" width="1774" height="887">
          <g fill="white">${panes}</g>
          <!-- The bench and folded blankets sit in front of the glass. -->
          <path fill="black" d="M1400 779 L1402 740 Q1403 725 1414 725 L1422 725 Q1426 718 1441 716
            Q1436 710 1446 705 Q1451 702 1470 702 L1490 693 Q1497 692 1514 697
            Q1527 697 1528 705 Q1544 697 1568 699 Q1605 697 1619 707
            Q1622 712 1618 715 L1621 724 Q1642 730 1645 736 L1645 743 L1438 744
            L1437 782 H1430 L1431 744 Q1412 732 1409 736 L1405 779 Z
            M1593 742 H1597 L1596 782 H1592 Z"/>
        </mask>
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
        <radialGradient id="${id}-disco-rose">
          <stop stop-color="#f477bc" stop-opacity=".86"/>
          <stop offset="1" stop-color="#ef78be" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${id}-disco-violet">
          <stop stop-color="#8177ff" stop-opacity=".9"/>
          <stop offset="1" stop-color="#786eff" stop-opacity="0"/>
        </radialGradient>
        <pattern id="${id}-disco-specks" width="149" height="113" patternUnits="userSpaceOnUse">
          <ellipse cx="15" cy="24" rx="4" ry="2.2" fill="#fff1bc"/>
          <ellipse cx="69" cy="14" rx="2.4" ry="1.6" fill="#edbbdf"/>
          <ellipse cx="124" cy="47" rx="3.5" ry="2" fill="#a3adff"/>
          <ellipse cx="43" cy="79" rx="2.7" ry="1.7" fill="#ffe0e4"/>
          <ellipse cx="104" cy="96" rx="3.2" ry="1.8" fill="#fff6d9"/>
        </pattern>
      </defs>
      ${standalone ? `<g ${label('facade','01 · Фасад и интерьер')}>
        <image href="${facade}" width="1774" height="887"/>
      </g>` : ''}
      <g ${label('window-dim','02 · Приглушённый свет в окнах')} mask="url(#${id}-windows)">
        <rect width="1774" height="887" fill="#252432" opacity=".37"/>
        <rect class="garage-art__off" width="1774" height="887" fill="#152436" fill-opacity=".68" ${standalone ? 'style="display:none"' : ''}/>
      </g>
      <g ${label('guests','03 · Гости за стеклом')} class="garage-art__on garage-art__guests" mask="url(#${id}-windows)">
        <image href="${silhouettes[0]}" x="1224" y="490" width="236" height="268" opacity=".94" filter="url(#${id}-ink)"/>
        <image href="${silhouettes[1]}" x="997" y="422" width="227" height="370" opacity=".94" filter="url(#${id}-ink)"/>
        <image href="${silhouettes[2]}" x="138" y="378" width="418" height="418" opacity=".90" filter="url(#${id}-ink)"/>
        <image href="${silhouettes[3]}" x="433" y="422" width="336" height="336" opacity=".90" filter="url(#${id}-ink)"/>
      </g>
      <g ${label('glass','04 · Отражения')} class="garage-art__on" mask="url(#${id}-windows)">
        <rect x="155" y="335" width="588" height="420" fill="url(#${id}-reflection)"/>
        <rect x="1030" y="373" width="598" height="425" fill="url(#${id}-reflection)" opacity=".65"/>
      </g>
      <g ${label('bulbs-off','05 · Выключенные лампочки')} class="garage-art__off" ${standalone ? 'style="display:none"' : ''}>${bulbShades}</g>
      <g ${label('bulbs-on','06 · Свет гирлянды')} class="garage-art__on">${bulbGlows}</g>
      <g ${label('disco','07 · Отблески дискотеки')} class="garage-art__on garage-art__disco" mask="url(#${id}-windows)">
        <g class="garage-art__disco-wash">
          <ellipse cx="480" cy="443" rx="196" ry="137" fill="url(#${id}-disco-rose)"/>
          <ellipse cx="678" cy="625" rx="139" ry="115" fill="url(#${id}-disco-violet)"/>
          <ellipse cx="1322" cy="509" rx="201" ry="133" fill="url(#${id}-disco-violet)"/>
          <ellipse cx="1528" cy="683" rx="152" ry="117" fill="url(#${id}-disco-rose)"/>
        </g>
        <rect class="garage-art__disco-specks" x="80" y="290" width="1600" height="540" fill="url(#${id}-disco-specks)"/>
      </g>
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
  const lightDelay = 2400;
  for (const scene of document.querySelectorAll('.garage-art')) {
    const picture = scene.querySelector('.garage-art__picture');
    picture.insertAdjacentHTML('beforeend', garageSvg(scene.id, '', silhouettes));
    guestsReady.then(ready => { if (ready) scene.classList.add('has-silhouettes'); });
    scene.dataset.lit = 'false';
    let lightTimer;
    const switchOn = () => {
      scene.dataset.lit = 'true';
      lightTimer = undefined;
    };
    if (!('IntersectionObserver' in window)) {
      setTimeout(switchOn, lightDelay);
      continue;
    }
    const observer = new IntersectionObserver(entries => {
      const visible = entries.at(-1).intersectionRatio >= .12;
      scene.classList.toggle('garage-art--visible', visible);
      if (!visible) {
        clearTimeout(lightTimer);
        lightTimer = undefined;
      } else if (scene.dataset.lit === 'false' && lightTimer === undefined) {
        lightTimer = setTimeout(switchOn, lightDelay);
      }
    }, {threshold:.12});
    observer.observe(scene);
  }
})();
