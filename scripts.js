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
  document.querySelectorAll('a[href^="#"]:not([data-gallery])').forEach(function (a) {
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

  /* ---------- Fotovenster per onderwerp (bio-boerderij) ----------
     De foto's staan als gewone lijst in de pagina (ul.topic-photos). Zonder JS
     toont een klik op "Bekijk foto's" die lijst (#fotos-...). Met JS opent een
     rustig fotovenster: vorige/volgende, pijltjestoetsen, Esc, vegen op gsm. */
  var galleryLinks = document.querySelectorAll('a[data-gallery]');
  if (galleryLinks.length && typeof HTMLDialogElement === 'function') {
    var dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-labelledby', 'lightbox-title');
    dlg.innerHTML =
      '<div class="lightbox__panel">' +
        '<div class="lightbox__bar">' +
          '<h2 class="lightbox__title" id="lightbox-title"></h2>' +
          '<span class="lightbox__count" aria-live="polite"></span>' +
          '<button type="button" class="lightbox__btn" data-lb="close">Sluiten</button>' +
        '</div>' +
        '<figure class="lightbox__figure">' +
          '<img class="lightbox__img" alt="" />' +
          '<figcaption></figcaption>' +
        '</figure>' +
        '<div class="lightbox__nav">' +
          '<button type="button" class="lightbox__btn" data-lb="prev">← Vorige</button>' +
          '<button type="button" class="lightbox__btn" data-lb="next">Volgende →</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(dlg);

    var lbTitle = dlg.querySelector('.lightbox__title');
    var lbCount = dlg.querySelector('.lightbox__count');
    var lbImg = dlg.querySelector('.lightbox__img');
    var lbCap = dlg.querySelector('figcaption');
    var lbNav = dlg.querySelector('.lightbox__nav');
    var lbPrev = dlg.querySelector('[data-lb="prev"]');
    var lbNext = dlg.querySelector('[data-lb="next"]');
    var lbClose = dlg.querySelector('[data-lb="close"]');
    var items = [], index = 0, opener = null;

    function readList(list) {
      return Array.prototype.map.call(list.querySelectorAll('li'), function (li) {
        var a = li.querySelector('a'), img = li.querySelector('img'), cap = li.querySelector('span');
        return {
          src: a.getAttribute('href'),
          w: a.getAttribute('data-width'), h: a.getAttribute('data-height'),
          alt: img ? img.getAttribute('alt') : '',
          caption: cap ? cap.textContent : ''
        };
      });
    }
    function preload(i) { if (items[i]) { var im = new Image(); im.src = items[i].src; } }
    function show(i) {
      index = (i + items.length) % items.length;
      var it = items[index];
      if (it.w && it.h) { lbImg.width = it.w; lbImg.height = it.h; }
      lbImg.src = it.src;
      lbImg.alt = it.alt;
      lbCap.textContent = it.caption;
      lbCount.textContent = items.length > 1 ? 'Foto ' + (index + 1) + ' van ' + items.length : '';
      preload(index + 1); preload(index - 1);
    }
    function open(listId, trigger) {
      var list = document.getElementById(listId);
      if (!list) return false;
      items = readList(list);
      if (!items.length) return false;
      opener = trigger;
      lbTitle.textContent = list.getAttribute('data-title') || '';
      lbNav.hidden = items.length < 2;
      show(0);
      root.classList.add('lightbox-open');
      dlg.showModal();
      lbClose.focus();
      return true;
    }
    function close() { if (dlg.open) dlg.close(); }

    dlg.addEventListener('close', function () {
      root.classList.remove('lightbox-open');
      lbImg.removeAttribute('src');
      if (opener && opener.getAttribute('tabindex') === '-1') {
        var item = opener.closest('.farm-list__item');
        opener = item ? item.querySelector('.photo-link') : opener;
      }
      if (opener) opener.focus();
    });
    galleryLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
        if (open(a.getAttribute('data-gallery'), a)) e.preventDefault();
      });
    });
    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', function () { show(index - 1); });
    lbNext.addEventListener('click', function () { show(index + 1); });
    lbImg.addEventListener('click', function () { if (items.length > 1) show(index + 1); });
    // Klik naast het venster (op de donkere achtergrond) sluit het
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener('keydown', function (e) {
      if (items.length < 2) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    });
    // Vegen op gsm of tablet
    var startX = null, startY = 0;
    dlg.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { startX = null; return; }
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    }, { passive: true });
    dlg.addEventListener('touchend', function (e) {
      if (startX === null || items.length < 2) return;
      var dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
      startX = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) show(dx < 0 ? index + 1 : index - 1);
    }, { passive: true });
  }

  /* ---------- Jaartal in de footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
