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
    initReveal();
    initCounts();
    initCarousels();
    initActiveLinks();
    initTracks();
    initCopyEmail();
    initContactForm();

    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------------ helpers */

  function all(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  /* Play the entrance animation on one element, then hand it back to normal styles
     (so hover effects such as the card lift work afterwards). */
  function animateIn(el, delay) {
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
    }
    el.addEventListener('animationend', function (e) { if (e.target === el) finish(); });
    window.setTimeout(finish, delay * 1000 + 2400); // safety net if animationend never fires
  }

  function markAllIn() {
    all('[data-hero], [data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
    all('[data-reveal-group] > *').forEach(function (el) { el.classList.add('is-in'); });
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

  /* Missing images: remove the broken <img> so the labelled placeholder shows */
  function initImages() {
    all('.media img').forEach(function (img) {
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
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
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

  /* ----------------------------------------------------------- scroll reveals */

  function initReveal() {
    if (!animate) { markAllIn(); return; }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el); // first view only

        if (el.hasAttribute('data-reveal-group')) {
          Array.prototype.slice.call(el.children).forEach(function (child, i) {
            animateIn(child, Math.min(i * 0.1, 0.7));
          });
        } else {
          animateIn(el, 0);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    all('[data-reveal], [data-reveal-group]').forEach(function (el) { observer.observe(el); });

    window.addEventListener('beforeprint', markAllIn);
  }

  /* Count-up for the stat numbers, once, the first time they are seen */
  function initCounts() {
    var els = all('.stat-num[data-count]');
    if (!els.length || !animate) return;

    function format(n) { return n.toLocaleString('en-US'); }

    els.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;
      el.textContent = '0' + suffix;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);

        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1500;
        var begin = null;

        function tick(now) {
          if (begin === null) begin = now;
          var t = Math.min((now - begin) / duration, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = format(Math.round(target * eased)) + suffix;
          if (t < 1) window.requestAnimationFrame(tick);
        }
        window.setTimeout(function () { window.requestAnimationFrame(tick); }, 400);
      });
    }, { threshold: 0.6 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------------------------- carousels */

  /* On phones and tablets the project rows scroll sideways and snap to a card.
     This adds previous/next buttons and dots (hidden on desktop by CSS). */
  function initCarousels() {
    all('[data-carousel]').forEach(function (carousel) {
      var track = carousel.querySelector('.carousel-track');
      if (!track) return;
      var cards = Array.prototype.slice.call(track.children);
      if (cards.length < 2) return;

      var controls = document.createElement('div');
      controls.className = 'carousel-controls';

      var prev = document.createElement('button');
      prev.type = 'button'; prev.className = 'carousel-btn'; prev.setAttribute('aria-label', 'Previous project');
      prev.textContent = '‹';

      var next = document.createElement('button');
      next.type = 'button'; next.className = 'carousel-btn'; next.setAttribute('aria-label', 'Next project');
      next.textContent = '›';

      var dotsWrap = document.createElement('div');
      dotsWrap.className = 'carousel-dots';
      var dots = cards.map(function (card, i) {
        var dot = document.createElement('button');
        dot.type = 'button'; dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
        return dot;
      });

      controls.appendChild(prev);
      controls.appendChild(dotsWrap);
      controls.appendChild(next);
      carousel.appendChild(controls);

      var active = 0;

      function padLeft() { return parseFloat(window.getComputedStyle(track).paddingLeft) || 0; }

      function goTo(i) {
        i = Math.max(0, Math.min(cards.length - 1, i));
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
        active = best;
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === active); });
        prev.disabled = active === 0;
        next.disabled = active === cards.length - 1;
      }

      var ticking = false;
      track.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () { update(); ticking = false; });
      }, { passive: true });
      window.addEventListener('resize', update);

      prev.addEventListener('click', function () { goTo(active - 1); });
      next.addEventListener('click', function () { goTo(active + 1); });
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

  /* Track picker: swaps the embedded player between Spotify and SoundCloud tracks */
  function initTracks() {
    var frame = document.getElementById('music-frame');
    var buttons = all('.track-btn');
    var note = document.getElementById('track-note');
    if (!frame || !buttons.length) return;

    function embed(provider, id) {
      if (provider === 'spotify') {
        return { src: 'https://open.spotify.com/embed/track/' + encodeURIComponent(id) + '?utm_source=generator&theme=0', height: 152 };
      }
      return {
        src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + encodeURIComponent(id) +
          '&color=%23B49CE7&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
        height: 166
      };
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var provider = btn.getAttribute('data-provider');
        var e = embed(provider, btn.getAttribute('data-id'));
        frame.src = e.src;
        frame.setAttribute('height', String(e.height));
        frame.title = btn.textContent + ' on ' + (provider === 'spotify' ? 'Spotify' : 'SoundCloud');
        if (note) note.textContent = btn.getAttribute('data-note') || '';
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
      });
    });
  }

  /* ------------------------------------------------------------------ contact */

  /* "Copy" button next to the email address */
  function initCopyEmail() {
    all('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var original = btn.textContent;
        function done(ok) {
          btn.textContent = ok ? 'Copied' : 'Press Ctrl/Cmd+C';
          window.setTimeout(function () { btn.textContent = original; }, 1800);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        } else {
          done(false);
        }
      });
    });
  }

  /* The form builds a mailto: link, so submitting opens the visitor's email app with
     a draft already written. Nothing is sent from the site itself. To actually send
     messages later, swap this for a form service (Formspree, Web3Forms, Netlify Forms). */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    var note = document.getElementById('cf-note');
    if (!form) return;

    var TO = 'jshanneson@gmail.com'; // change if you want a different inbox

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements.name;
      var topic = form.elements.topic;
      var message = form.elements.message;
      var ok = true;

      [name, message].forEach(function (field) {
        var empty = !field.value.trim();
        field.classList.toggle('is-invalid', empty);
        field.setAttribute('aria-invalid', String(empty));
        if (empty) ok = false;
      });

      if (!ok) {
        if (note) note.textContent = 'Please add your name and a short message.';
        return;
      }

      var subject = 'Project inquiry: ' + topic.value;
      var body = message.value.trim() + '\n\n' + name.value.trim();
      if (note) note.textContent = 'Opening your email app. If nothing happens, write to ' + TO + '.';
      window.location.href = 'mailto:' + TO +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
