(function () {
  'use strict';

  var root    = document.documentElement;
  var btnTh   = document.getElementById('btnTheme');
  var mailBtn = document.getElementById('mailBtn');

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Contact ----------
     Objet et corps sont trop longs pour rester lisibles dans un attribut href. */
  var MAIL = {
    to: 'contact@novaflow-ops.com',
    subject: 'NovaFlow, demande sur un processus a automatiser',
    body: "Bonjour,\n\nVoici mon cas :\n\n- Processus concerne :\n- Formats de fichiers ou source (CSV, boite mail, base, autre) :\n- Volume mensuel approximatif :\n- Ce qui prend le plus de temps aujourd'hui :\n- Echeance souhaitee :\n\nMerci."
  };

  if (mailBtn) {
    mailBtn.setAttribute('href',
      'mailto:' + MAIL.to +
      '?subject=' + encodeURIComponent(MAIL.subject) +
      '&body=' + encodeURIComponent(MAIL.body));
  }

  /* ---------- Copie de l'adresse ----------
     API native uniquement, repli silencieux si le navigateur ne la propose pas. */
  var copyBtn = document.getElementById('btnCopy');

  if (copyBtn) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      copyBtn.hidden = true;
    } else {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(MAIL.to).then(function () {
          var initial = copyBtn.getAttribute('data-label') || copyBtn.textContent;
          copyBtn.setAttribute('data-label', initial);
          copyBtn.textContent = 'Adresse copiée';
          copyBtn.classList.add('ok');
          setTimeout(function () {
            copyBtn.textContent = initial;
            copyBtn.classList.remove('ok');
          }, 2400);
        }, function () {});
      });
    }
  }

  /* ---------- Thème ----------
     Sans choix explicite, c'est la préférence système qui décide. */
  var prefersDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return prefersDark && prefersDark.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (btnTh) btnTh.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  /* Tant que l'utilisateur n'a rien choisi, le site suit le système en direct. */
  if (prefersDark && prefersDark.addEventListener) {
    prefersDark.addEventListener('change', function () {
      if (!store.get('novaflow-theme')) {
        root.removeAttribute('data-theme');
        if (btnTh) btnTh.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
      }
    });
  }

  if (btnTh) {
    btnTh.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      store.set('novaflow-theme', next);
      applyTheme(next);
    });
    /* Pas d'attribut posé au chargement sans choix mémorisé : le CSS suit le système. */
    btnTh.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
  }

  /* ---------- Apparition au défilement, coupée si l'utilisateur refuse les animations ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('on');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });

    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }
})();
