(function () {
  var openers = document.querySelectorAll('.crate-open');

  function close(btn, restoreFocus) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    panel.classList.remove('is-opening');
    btn.setAttribute('aria-expanded', 'false');
    if (restoreFocus) btn.focus();
  }

  function open(btn) {
    openers.forEach(function (other) { if (other !== btn) close(other, false); });
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    panel.classList.remove('is-opening');
    void panel.offsetWidth;
    panel.classList.add('is-opening');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    panel.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    var heading = panel.querySelector('h3');
    if (heading) heading.focus({ preventScroll: true });
  }

  openers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-expanded') === 'true') close(btn, true);
      else open(btn);
    });
  });

  document.querySelectorAll('.back [data-close]').forEach(function (b) {
    b.addEventListener('click', function () {
      var panel = b.closest('.back');
      var btn = document.querySelector('[aria-controls="' + panel.id + '"]');
      if (btn) close(btn, true);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    openers.forEach(function (btn) {
      if (btn.getAttribute('aria-expanded') === 'true') close(btn, true);
    });
  });
})();
