/* =========================================================================
   't Kleinhof Vechmaal — gedeelde scripts
   Vanilla JavaScript, geen bibliotheken.
   ========================================================================= */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Mobiel menu ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var backdrop = document.querySelector('.nav-backdrop');
  function setMenu(open) {
    root.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Sluiten' : 'Menu';
    }
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!root.classList.contains('nav-open')); });
  if (backdrop) backdrop.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  /* ---------- Actieve menu-link ---------- */
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav__links a:not(.btn)').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === here) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Sticky header (schaduw bij scrollen) ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 24); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Smooth scroll voor ankers op dezelfde pagina ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = header ? header.offsetHeight + 12 : 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll-animaties ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Formuliervalidatie (demo-formulieren) ---------- */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var val = (input.value || '').trim();
        var valid = val !== '' && (input.type !== 'email' || emailRe.test(val));
        if (field) field.classList.toggle('has-error', !valid);
        if (!valid && ok) { input.focus(); ok = false; }
      });
      if (ok) form.classList.add('is-sent');
    });
    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field) field.classList.remove('has-error');
      });
    });
  });

  /* ---------- Reserveringsapp: hoogte van de iframe automatisch aanpassen ---------- */
  var resFrame = document.getElementById('kleinhof');
  if (resFrame) {
    var wrap = resFrame.closest('.res-frame');
    resFrame.addEventListener('load', function () { if (wrap) wrap.classList.add('is-loaded'); });
    window.addEventListener('message', function (e) {
      var d = e.data || {};
      if (d.type === 'kleinhof:resize' && d.height) {
        resFrame.style.height = d.height + 'px';
        resFrame.style.minHeight = '0';
        if (wrap) wrap.classList.add('is-loaded');
      }
    });
  }

  /* ---------- Jaartal in de footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
