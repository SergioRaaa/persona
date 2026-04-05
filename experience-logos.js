(function initExperienceLogoGrid() {
  var logoGrid = document.querySelector('[data-experience-logo-grid]');
  if (!logoGrid) {
    return;
  }

  var items = Array.prototype.slice.call(logoGrid.children);
  for (var i = items.length - 1; i > 0; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
  items.forEach(function (item) {
    logoGrid.appendChild(item);
  });

  var logoItems = logoGrid.querySelectorAll('.logo-item');

  function clearAll(activeItem) {
    logoItems.forEach(function (item) {
      if (item !== activeItem) {
        item.classList.remove('is-hovered');
      }
    });
  }

  logoItems.forEach(function (item) {
    var leaveTimer = null;

    function activate() {
      if (leaveTimer) {
        window.clearTimeout(leaveTimer);
        leaveTimer = null;
      }
      clearAll(item);
      item.classList.add('is-hovered');
    }

    function deactivate() {
      if (leaveTimer) {
        window.clearTimeout(leaveTimer);
      }
      leaveTimer = window.setTimeout(function () {
        item.classList.remove('is-hovered');
      }, 120);
    }

    item.addEventListener('mouseenter', activate);
    item.addEventListener('mouseleave', deactivate);
    item.addEventListener('focusin', activate);
    item.addEventListener('focusout', deactivate);

    item.addEventListener('click', function () {
      if (item.classList.contains('is-hovered')) {
        item.classList.remove('is-hovered');
        return;
      }
      activate();
    });
  });

  document.addEventListener('click', function (evt) {
    if (evt.target && evt.target.closest && evt.target.closest('[data-experience-logo-grid]')) {
      return;
    }
    clearAll(null);
  });
})();
