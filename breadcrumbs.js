(function initBreadcrumbs() {
  var navEl = document.querySelector('.breadcrumbs');
  var currentEl = document.querySelector('[data-breadcrumb-current]');
  if (!navEl || !currentEl) {
    return;
  }

  var path = window.location.pathname || '';
  var file = path.split('/').pop() || 'index.html';
  var titleNode = document.querySelector('.page-title');
  var pageTitle = titleNode ? titleNode.textContent.trim() : (document.title || '').trim();

  if (file === 'index.html' || file === '') {
    navEl.hidden = true;
    return;
  }

  var trailByFile = {
    'touch.html': [
      { label: 'Серия мини-фильмов к выставке в “Русском музее”', href: './seriya-mini-filmov-russkiy-muzey.html' }
    ],
    'insideout2.html': [
      { label: 'Серия мини-фильмов к выставке в “Русском музее”', href: './seriya-mini-filmov-russkiy-muzey.html' }
    ],
    'sinpulsy.html': [
      { label: 'Серия мини-фильмов к выставке в “Русском музее”', href: './seriya-mini-filmov-russkiy-muzey.html' }
    ],
    'splanirovannye-sluchaynosti.html': [
      { label: 'Серия мини-фильмов к выставке в “Русском музее”', href: './seriya-mini-filmov-russkiy-muzey.html' }
    ]
  };

  function makeSep() {
    var sep = document.createElement('span');
    sep.className = 'breadcrumbs__sep';
    sep.textContent = '›';
    return sep;
  }

  navEl.innerHTML = '';

  var home = document.createElement('a');
  home.className = 'breadcrumbs__link';
  home.href = './index.html';
  home.textContent = 'Главная';
  navEl.appendChild(home);

  var trail = trailByFile[file] || [];
  trail.forEach(function (item) {
    navEl.appendChild(makeSep());
    if (item.href) {
      var link = document.createElement('a');
      link.className = 'breadcrumbs__link breadcrumbs__group';
      link.href = item.href;
      link.textContent = item.label;
      navEl.appendChild(link);
      return;
    }

    var group = document.createElement('span');
    group.className = 'breadcrumbs__group';
    group.textContent = item.label;
    navEl.appendChild(group);
  });

  navEl.appendChild(makeSep());
  currentEl.setAttribute('aria-current', 'page');
  currentEl.textContent = pageTitle || 'Страница';
  navEl.appendChild(currentEl);
})();
