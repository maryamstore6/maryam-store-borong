/* sinematik.js — kesan sinematik untuk halaman dalaman (tanpa ubah HTML).
   Dimuat dengan `defer` SELEPAS kandungan. Selamat: kalau elemen tiada, skip. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WA = 'https://wa.me/60176055349?text=' + encodeURIComponent('Assalamualaikum, saya nak order borong');

  /* --- bar progress skrol --- */
  var prog = document.createElement('div');
  prog.id = 'cineProg';
  document.body.appendChild(prog);

  /* --- hero: Ken Burns pada lapisan gambar sendiri (teks tak ikut zoom) --- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var bg = getComputedStyle(hero).backgroundImage;
    if (bg && bg !== 'none' && bg.indexOf('url(') === 0) {
      var layer = document.createElement('div');
      layer.className = 'cine-hero-bg';
      layer.style.backgroundImage = bg;
      hero.insertBefore(layer, hero.firstChild);
      hero.classList.add('cine-hero');
    }
  }

  /* --- nav: solid bila skrol --- */
  var nav = document.querySelector('.nav');

  /* --- reveal on scroll --- */
  var pick = document.querySelectorAll(
    '.wrap > h1, .wrap > h2, .wrap > p, .wrap > ul, .wrap > table, .card, .prod-card, .feature, .feat-point, .final h2, .trust span'
  );
  var targets = [];
  for (var i = 0; i < pick.length; i++) { pick[i].classList.add('cine-r'); targets.push(pick[i]); }
  if (reduce) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- butang WhatsApp terapung (skip kalau halaman dah ada sendiri) --- */
  if (!document.querySelector('.fab,#cineFab')) {
    var a = document.createElement('a');
    a.id = 'cineFab';
    a.href = WA;
    a.setAttribute('aria-label', 'WhatsApp kami');
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 1.8 2.9 4.5 4 2.6 1 3.1.8 3.7.8.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.4-1.3-2.9-1.3-4.6 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.5-8.2 8.5z"/></svg> WhatsApp';
    document.body.appendChild(a);
  }

  /* --- gelung scroll (progress + nav) --- */
  var ticking = false;
  function frame() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('solid', window.scrollY > 60);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  frame();

  /* --- jejak Lead Meta untuk klik WhatsApp terapung (elak kiraan dua kali:
         halaman sedia ada ada handler global pada klik <a href*=wa.me>) --- */
})();
