/* Joshua Hanneson portfolio: dependency-free behaviour shared by index.html
   and project.html.

   ANIMATION RULES
   - Hero text and image animate once when the page loads.
   - Everything else ([data-reveal], [data-reveal-group]) animates ONCE, the first
     time it scrolls into view. After that it stays put until the page is reloaded.
   - Visitors who prefer reduced motion get no entrance animations at all.
   - Debug tip: add ?static to the URL to turn all animations off.
*/
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var staticMode = /[?&]static(\b|=|&|$)/.test(window.location.search);
  var animate = !reduceMotion && !staticMode && 'IntersectionObserver' in window;

  document.addEventListener('DOMContentLoaded', function () {
    root.setAttribute('data-anim', 'ready'); // tells the failsafe in <head> that scripts are running

    initNav();
    initBackToTop();
    initImages();
    initHero();
    initHeroCarousel();
    initReveal();
    initCarousels();
    initActiveLinks();
    initTracks();

    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------------ helpers */

  function all(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  /* Play the entrance animation on one element, then hand it back to normal styles
     (so hover effects such as the card lift work afterwards). */
  function animateIn(el, delay, done) {
    if (el.classList.contains('is-in') || el.classList.contains('is-animating')) return;
    delay = delay || 0;
    el.style.setProperty('--d', delay + 's');
    el.classList.add('is-animating');

    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      el.classList.remove('is-animating');
      el.classList.add('is-in');
      el.style.removeProperty('--d');
      if (done) done();
    }
    el.addEventListener('animationend', function (e) { if (e.target === el) finish(); });
    window.setTimeout(finish, delay * 1000 + 2400); // safety net if animationend never fires
  }

  function markAllIn() {
    all('[data-hero], [data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
    all('[data-reveal-group] > *').forEach(function (el) { el.classList.add('is-in'); });
    all('.carousel-track').forEach(function (t) { t.classList.add('reveal-done'); });
  }

  /* ---------------------------------------------------------------------- nav */

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    var brand = document.querySelector('.brand');   // the name link sits outside the menu but should close it too
    if (brand) brand.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function () {
      setOpen(false);
    });
  }

  /* "Back to top" and the logo: always scroll all the way to the very top */
  function initBackToTop() {
    all('a[href="#top"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        try { window.history.replaceState(null, '', window.location.pathname + window.location.search); } catch (err) { /* file:// */ }
      });
    });
  }

  /* Missing images: remove the broken <img> so the labelled placeholder shows (button icons just disappear) */
  function initImages() {
    all('.media img, .btn-icon').forEach(function (img) {
      function drop() { if (img.parentNode) img.parentNode.removeChild(img); }
      img.addEventListener('error', drop);
      if (img.complete && img.naturalWidth === 0) drop();
    });
  }

  /* ---------------------------------------------------------------- hero load */

  /* Wrap each word of an element in <span class="w"> so words can fly in one by one */
  function splitWords(el, start, step) {
    var count = 0;
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/([ \t\r\n]+)/).forEach(function (part) {
            if (!part) return;
            if (/^[ \t\r\n]+$/.test(part)) {
              frag.appendChild(document.createTextNode(' '));
            } else {
              var span = document.createElement('span');
              span.className = 'w';
              span.style.setProperty('--wd', (start + count * step).toFixed(2) + 's');
              span.textContent = part;
              frag.appendChild(span);
              count++;
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    }
    walk(el);
    return count;
  }

  function initHero() {
    var items = all('[data-hero]');
    if (!items.length) return;

    if (!animate) {
      items.forEach(function (el) { el.classList.add('is-in', 'is-split'); });
      return;
    }

    var cursor = 0.1;
    items.forEach(function (el) {
      var kind = el.getAttribute('data-hero');

      if (kind === 'image') {
        animateIn(el, 0.25);
      } else if (kind === 'split') {
        var step = 0.075;
        var words = splitWords(el, cursor, step);
        el.classList.add('is-split', 'w-run');
        cursor += Math.min(words * step, 0.7) + 0.15;
        el.classList.add('is-in');
      } else {
        animateIn(el, cursor);
        cursor += 0.14;
      }
    });
  }

  /* ------------------------------------------------------------ hero slideshow */

  /* Cross-fading slideshow in the hero: dots underneath, arrows, swipe and arrow keys.
     Autoplays (5s per slide) but holds still while the mouse is over it, keyboard focus is
     inside it, it is scrolled out of view, or the tab is hidden. Visitors who prefer reduced
     motion get no autoplay. */
  function initHeroCarousel() {
    var box = document.querySelector('[data-hero-carousel]');
    if (!box) return;
    var slides = all('.hero-slide', box);
    var stage = box.querySelector('.hero-slides');
    var prevBtn = box.querySelector('.hc-prev');
    var nextBtn = box.querySelector('.hc-next');
    var DWELL = 5000; // ms per slide

    if (slides.length < 2) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
      return;
    }

    var current = 0;
    var hovering = false, focused = false, offscreen = false, tabHidden = false;
    var timer = null, leaveTimer = null;

    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'dots';
    var dots = slides.map(function (s, i) {
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'dot';
      d.setAttribute('aria-label', 'Show image ' + (i + 1) + ' of ' + slides.length);
      d.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(d);
      return d;
    });
    box.appendChild(dotsWrap);

    function holding() { return reduceMotion || hovering || focused || offscreen || tabHidden; }

    function schedule() {
      window.clearTimeout(timer);
      if (holding()) return;
      timer = window.setTimeout(function () { goTo(current + 1); }, DWELL);
    }

    function goTo(i) {
      i = (i + slides.length) % slides.length;
      if (i !== current) {
        var old = slides[current];
        slides.forEach(function (s) { s.classList.remove('is-leaving'); });
        old.classList.remove('is-active');
        old.classList.add('is-leaving');
        window.clearTimeout(leaveTimer);
        leaveTimer = window.setTimeout(function () { old.classList.remove('is-leaving'); }, 950);
        current = i;
        slides[current].classList.add('is-active');
      }
      dots.forEach(function (d, n) {
        d.classList.toggle('is-active', n === current);
        if (n === current) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      schedule();
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });

    // Keyboard: left / right arrows while focus is inside the slideshow
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { goTo(current - 1); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { goTo(current + 1); e.preventDefault(); }
    });

    // Hold while a mouse is over it or keyboard focus is inside (touch taps do not count as hover)
    box.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovering = true; schedule(); } });
    box.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hovering = false; schedule(); } });
    box.addEventListener('focusin', function (e) {
      try { focused = e.target.matches(':focus-visible'); } catch (err) { focused = true; }
      schedule();
    });
    box.addEventListener('focusout', function () { focused = false; schedule(); });

    // Swipe on touch screens
    var startX = null, startY = null;
    stage.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      startX = e.clientX; startY = e.clientY;
    });
    stage.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      startX = startY = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener('pointercancel', function () { startX = startY = null; });

    // Only run while visible and while the tab is showing
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        offscreen = !entries[0].isIntersecting;
        schedule();
      }, { threshold: 0.25 }).observe(box);
    }
    document.addEventListener('visibilitychange', function () { tabHidden = document.hidden; schedule(); });

    root.classList.add('hc-ready');
    goTo(0);
  }

  /* ----------------------------------------------------------- scroll reveals */

  function initReveal() {
    if (!animate) { markAllIn(); return; }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el); // first view only

        if (el.hasAttribute('data-reveal-group')) {
          var kids = Array.prototype.slice.call(el.children);
          var left = kids.length;
          kids.forEach(function (child, i) {
            animateIn(child, Math.min(i * 0.1, 0.7), function () {
              // Carousel tracks keep scroll-snap switched off until every card has landed
              // (a snapping scroller chases the moving cards and causes a visible jerk).
              if (--left === 0) el.classList.add('reveal-done');
            });
          });
        } else {
          animateIn(el, 0);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    all('[data-reveal], [data-reveal-group]').forEach(function (el) { observer.observe(el); });

    window.addEventListener('beforeprint', markAllIn);
  }

  /* --------------------------------------------------------------- carousels */

  /* On phones and tablets the project row scrolls sideways and snaps to a card.
     This adds a row of dots under it (hidden on desktop by CSS). */
  function initCarousels() {
    all('[data-carousel]').forEach(function (carousel) {
      var track = carousel.querySelector('.carousel-track');
      if (!track) return;
      var cards = Array.prototype.slice.call(track.children);
      if (cards.length < 2) return;

      var dotsWrap = document.createElement('div');
      dotsWrap.className = 'dots';
      var dots = cards.map(function (card, i) {
        var dot = document.createElement('button');
        dot.type = 'button'; dot.className = 'dot';
        dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
        return dot;
      });
      carousel.appendChild(dotsWrap);

      function padLeft() { return parseFloat(window.getComputedStyle(track).paddingLeft) || 0; }

      function goTo(i) {
        track.scrollTo({ left: cards[i].offsetLeft - padLeft(), behavior: reduceMotion ? 'auto' : 'smooth' });
      }

      function update() {
        var x = track.scrollLeft;
        var best = 0, bestDist = Infinity;
        cards.forEach(function (card, i) {
          var dist = Math.abs(card.offsetLeft - padLeft() - x);
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        if (x + track.clientWidth >= track.scrollWidth - 4) best = cards.length - 1; // scrolled to the end
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === best); });
      }

      var ticking = false;
      track.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () { update(); ticking = false; });
      }, { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  }

  /* ------------------------------------------------------------- active links */

  /* Highlight the nav link for the section in view (home page only) */
  function initActiveLinks() {
    if (!('IntersectionObserver' in window)) return;

    var links = all('.site-nav a[href^="#"]');
    if (!links.length) return;

    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var sections = Object.keys(map)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-current'); a.removeAttribute('aria-current'); });
        var link = map[entry.target.id];
        if (link && !link.classList.contains('nav-cta')) {
          link.classList.add('is-current');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* -------------------------------------------------------------------- music */

  /* Track picker: swaps the embedded Spotify player between tracks */
  function initTracks() {
    var frame = document.getElementById('music-frame');
    var buttons = all('.track-btn');
    if (!frame || !buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        frame.src = 'https://open.spotify.com/embed/track/' + encodeURIComponent(btn.getAttribute('data-id')) +
          '?utm_source=generator&theme=0';
        frame.title = btn.textContent + ' on Spotify';
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
      });
    });
  }

})();
