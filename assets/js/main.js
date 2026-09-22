(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var cfg = window.ELREMEDIO_CONFIG || {};

  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }

  function isUrl(v) { return typeof v === 'string' && /^https?:\/\//i.test(v); }

  /* Enlaces globales (carta, reservas, redes, email): activos solo con dato real */
  var pendingKeys = {};
  document.querySelectorAll('[data-cfg-link]').forEach(function (a) {
    var key = a.getAttribute('data-cfg-link');
    var path = key === 'instagram' ? 'redes.instagram' : key;
    var val = get(cfg, path);
    var ok = key === 'email' ? typeof val === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val) : isUrl(val);
    if (ok) {
      a.setAttribute('href', key === 'email' ? 'mailto:' + val : val);
      if (key !== 'email') { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer'); }
      pendingKeys[key] = false;
    } else {
      a.classList.add('is-pending');
      a.removeAttribute('href');
      a.setAttribute('role', 'link');
      a.setAttribute('aria-disabled', 'true');
      a.textContent = a.getAttribute('data-pending-label') || a.textContent;
      pendingKeys[key] = true;
    }
  });
  document.querySelectorAll('[data-cfg-pending]').forEach(function (n) {
    if (pendingKeys[n.getAttribute('data-cfg-pending')] === false) n.hidden = true;
  });

  /* Datos de cada local */
  document.querySelectorAll('[data-local]').forEach(function (card) {
    var data = (cfg.locales || {})[card.getAttribute('data-local')] || {};
    card.querySelectorAll('[data-field]').forEach(function (dd) {
      var v = data[dd.getAttribute('data-field')];
      if (typeof v === 'string' && v.trim()) { dd.textContent = v; dd.classList.remove('is-pending'); }
      else dd.classList.add('is-pending');
    });
    var map = card.querySelector('[data-field-link="mapa"]');
    if (map && isUrl(data.mapa)) {
      map.href = data.mapa; map.target = '_blank'; map.rel = 'noopener noreferrer'; map.hidden = false;
    }
    var wa = card.querySelector('[data-field-link="whatsapp"]');
    if (wa && typeof data.telefono === 'string' && data.telefono.trim()) {
      wa.href = 'https://wa.me/' + data.telefono.replace(/[^0-9]/g, '');
      wa.target = '_blank'; wa.rel = 'noopener noreferrer'; wa.hidden = false;
    }
  });

  /* Menú móvil */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
    });
  }

  /* Enlace activo según sección visible */
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id && !l.classList.contains('nav-cta'));
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) {
      var s = document.querySelector(l.getAttribute('href'));
      if (s) secObs.observe(s);
    });

    /* Revelado al entrar */
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); revObs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.manifesto__grid > *, .pillars li, .moment, .table__cards li, .place, .visit__inner > *')
      .forEach(function (n) { n.classList.add('reveal'); revObs.observe(n); });
  }
})();
