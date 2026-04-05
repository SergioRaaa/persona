(function initFooterPartial() {
  var footers = document.querySelectorAll('.site-footer');
  if (!footers.length) {
    return;
  }

  var footerHtml = [
    '<p class="site-footer__line">© 2026 Сергей Рахамимов. Сайт носит исключительно информационный характер.</p>',
    '<p class="site-footer__line">Сайт не использует формы, не применяет аналитику и не собирает персональные данные посетителей.</p>'
  ].join('');

  footers.forEach(function (footer) {
    footer.innerHTML = footerHtml;
  });
})();
