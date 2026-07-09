/* ============================================================
   ListeningMind 앱 크롬(상단 헤더 + 좌측 아이콘 레일) 주입 스크립트.
   프로토타입 HTML에서 <body data-lm-active="cepfinder"> 처럼 지정하면
   기존 본문을 .lm-content 로 감싸고 실서비스와 동일한 크롬을 덧씌운다.
   출처: hubble-intent/src/layouts/common/{header,sidebar}
   ============================================================ */
(function () {
  const ICONS = {
    home: '<path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    queryfinder: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    pathfinder: '<path d="M4 7l6-3 4 3 6-3v13l-6 3-4-3-6 3z"/><path d="M10 4v13M14 7v13"/>',
    clusterfinder: '<circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="12" cy="16" r="3"/>',
    cepfinder: '<circle cx="6" cy="7" r="3"/><rect x="14" y="4" width="6" height="6" rx="1"/><path d="M4 20l4-6 4 6z"/>',
    journeyfinder: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    aioptimizer: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
    keywordgap: '<path d="M4 20V8m5 12V4m5 16v-6m5 6V10"/>',
    topcontents: '<path d="M5 4h14v3a5 5 0 0 1-10 0V4M8 4a4 4 0 0 1-4 4M16 4a4 4 0 0 0 4 4M9 16h6M8 20h8"/>',
    mykeyword: '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>',
    keywordtrend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2m10-10 2-2"/>',
  };

  const RAIL_GROUPS = [
    [
      { id: 'queryfinder', label: '쿼리파인더' },
      { id: 'pathfinder', label: '패스파인더' },
      { id: 'clusterfinder', label: '클러스터파인더' },
      { id: 'cepfinder', label: 'CEP 파인더' },
      { id: 'journeyfinder', label: '저니파인더' },
    ],
    [
      { id: 'aioptimizer', label: 'AI 옵티마이저' },
      { id: 'keywordgap', label: '키워드갭' },
      { id: 'topcontents', label: '탑콘텐츠' },
      { id: 'mykeyword', label: '마이인텐트' },
      { id: 'keywordtrend', label: '키워드트렌드' },
    ],
  ];

  function svg(paths) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
      'stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>'
    );
  }

  function railItem(item, active) {
    return (
      '<span class="item' + (item.id === active ? ' active' : '') + '" title="' +
      item.label + '" data-id="' + item.id + '">' + svg(ICONS[item.id]) + '</span>'
    );
  }

  function build() {
    const active = document.body.getAttribute('data-lm-active') || '';

    // 기존 본문을 content 로 이동
    const content = document.createElement('div');
    content.className = 'lm-content';
    while (document.body.firstChild) {
      content.appendChild(document.body.firstChild);
    }

    const railGroups = RAIL_GROUPS.map(
      (g) => '<div class="group">' + g.map((it) => railItem(it, active)).join('') + '</div>',
    ).join('');

    const app = document.createElement('div');
    app.className = 'lm-app';
    app.innerHTML =
      '<header class="lm-header">' +
        '<div class="lm-header-l">' +
          '<div class="lm-logo">' +
            '<span class="mark"></span>' +
            '<span class="wordmark">Listening<b>Mind</b></span>' +
            '<span class="lm-release">RELEASE</span>' +
          '</div>' +
          '<nav class="lm-nav">' +
            '<a href="#">플랜정보</a><a href="#">블로그</a><a href="#">사용 가이드</a>' +
          '</nav>' +
        '</div>' +
        '<div class="lm-header-r">' +
          '<span class="lm-globe"></span>' +
          '<span style="font-size:13px;color:var(--lm-grey-700);font-weight:500;">KR</span>' +
          '<div class="lm-acct">' +
            '<div class="who"><b>ASCENT</b><span>Professional</span></div>' +
            '<span class="avatar"></span>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="lm-body">' +
        '<nav class="lm-rail">' +
          '<span class="item' + (active === 'home' ? ' active' : '') + '" title="홈" data-id="home">' +
            svg(ICONS.home) + '</span>' +
          railGroups +
          '<span class="spacer"></span>' +
          '<span class="item" title="설정" data-id="settings">' + svg(ICONS.settings) + '</span>' +
        '</nav>' +
      '</div>';

    app.querySelector('.lm-body').appendChild(content);
    document.body.appendChild(app);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
