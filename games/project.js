/* Renders a case-study page from projects.js.
   The URL decides which project: project.html?p=<slug>
   Content is built with textContent / DOM nodes (no innerHTML).
   Elements get data-hero / data-reveal attributes; script.js animates them
   the first time they are seen. */
(function () {
  'use strict';

  var projects = window.PROJECTS || [];
  var root = document.getElementById('project-root');
  if (!root) return;

  var slug = new URLSearchParams(window.location.search).get('p');
  var index = -1;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].slug === slug) { index = i; break; }
  }

  root.textContent = '';

  if (index === -1) {
    renderNotFound();
    return;
  }

  var p = projects[index];
  document.title = p.title + ' | Joshua Hanneson';
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', p.title + ': ' + (p.tagline || p.role));

  render(p);

  /* ---------- helpers ---------- */

  function h(tag, props, kids) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === 'text') node.textContent = props[k];
      else if (k === 'class') node.className = props[k];
      else node.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  }

  function figure(src, alt, caption, label) {
    var img = h('img', { src: src, alt: alt || '', loading: 'lazy', width: '1280', height: '800' });
    var media = h('div', { 'class': 'media', 'data-label': label || src.split('/').pop() }, [img]);
    return h('figure', { 'class': 'proj-figure' }, [media, caption ? h('figcaption', { text: caption }) : null]);
  }

  function reveal(node) {
    node.setAttribute('data-reveal', '');
    return node;
  }

  function section(title, children) {
    var kids = [];
    if (title) kids.push(reveal(h('h2', { text: title })));
    children.forEach(function (c) { kids.push(c); });
    return h('section', { 'class': 'proj-section' }, [h('div', { 'class': 'container narrow' }, kids)]);
  }

  function paragraphs(list) {
    return (list || []).map(function (t) { return reveal(h('p', { text: t })); });
  }

  /* ---------- page ---------- */

  function render(p) {
    var frag = document.createDocumentFragment();

    /* Header block (animates in on load) */
    var facts = (p.facts || []).map(function (pair) {
      return h('div', {}, [h('dt', { text: pair[0] }), h('dd', { text: pair[1] })]);
    });

    var links = (p.links || []).map(function (l) {
      return h('a', {
        'class': 'btn btn-accent',
        href: l.url, target: '_blank', rel: 'noopener', text: l.label
      });
    });

    function hero(node) { node.setAttribute('data-hero', ''); return node; }

    frag.appendChild(h('section', { 'class': 'proj-head' }, [
      h('div', { 'class': 'container narrow' }, [
        hero(h('a', { 'class': 'crumb', href: 'index.html#work', text: '← All work' })),
        hero(h('p', { 'class': 'badge', text: p.type })),
        h('h1', { text: p.title, 'data-hero': 'split' }),
        p.tagline ? hero(h('p', { 'class': 'lead', text: p.tagline })) : null,
        facts.length ? hero(h('dl', { 'class': 'facts' }, facts)) : null,
        links.length ? hero(h('div', { 'class': 'btn-row' }, links)) : null
      ])
    ]));

    if (p.image) {
      var heroFig = figure(p.image, p.imageAlt, '', p.image.split('/').pop());
      heroFig.setAttribute('data-hero', 'image');
      frag.appendChild(h('div', { 'class': 'container proj-hero-media' }, [heroFig]));
    }

    /* Overview + highlights */
    var overviewKids = paragraphs(p.overview);
    if (p.highlights && p.highlights.length) {
      overviewKids.push(h('ul', { 'class': 'bullets', 'data-reveal': '' },
        p.highlights.map(function (t) { return h('li', { text: t }); })));
    }
    if (overviewKids.length) frag.appendChild(section('Overview', overviewKids));

    /* Results */
    if (p.results && p.results.length) {
      var items = p.results.map(function (r) {
        var attrs = { 'class': 'stat-num', text: r.value };
        return h('li', {}, [h('span', attrs), h('span', { 'class': 'stat-label', text: r.label })]);
      });
      frag.appendChild(h('section', { 'class': 'proj-section' }, [
        h('div', { 'class': 'container narrow' }, [reveal(h('ul', { 'class': 'stats stats-panel' }, items))])
      ]));
    }

    /* Process */
    if (p.process && p.process.length) {
      var steps = p.process.map(function (s) {
        return reveal(h('li', { 'class': 'step' }, [
          h('h3', { text: s.title }),
          h('p', { text: s.text }),
          s.image ? figure(s.image, s.imageAlt, s.caption) : null
        ]));
      });
      frag.appendChild(section('How it came together', [h('ol', { 'class': 'steps' }, steps)]));
    } else {
      frag.appendChild(section('', [reveal(h('p', { 'class': 'coming-soon', text: 'A fuller write-up of this project is coming soon.' }))]));
    }

    /* Gallery */
    if (p.gallery && p.gallery.length) {
      var shots = p.gallery.map(function (g) { return figure(g.src, g.alt, g.caption); });
      frag.appendChild(h('section', { 'class': 'proj-section' }, [
        h('div', { 'class': 'container' }, [
          reveal(h('h2', { 'class': 'gallery-title', text: 'Gallery' })),
          h('div', { 'class': 'gallery', 'data-reveal-group': '' }, shots)
        ])
      ]));
    }

    /* Takeaways */
    if (p.takeaways && p.takeaways.length) {
      frag.appendChild(section('Takeaways', [
        h('ul', { 'class': 'bullets', 'data-reveal': '' }, p.takeaways.map(function (t) { return h('li', { text: t }); }))
      ]));
    }

    /* Prev / next */
    var prev = projects[(index - 1 + projects.length) % projects.length];
    var next = projects[(index + 1) % projects.length];
    frag.appendChild(h('nav', { 'class': 'pager', 'aria-label': 'More projects' }, [
      h('div', { 'class': 'container pager-inner', 'data-reveal': 'fade' }, [
        h('a', { href: 'project.html?p=' + encodeURIComponent(prev.slug), 'class': 'pager-link' }, [
          h('span', { text: '← Previous' }), h('strong', { text: prev.title })
        ]),
        h('a', { href: 'project.html?p=' + encodeURIComponent(next.slug), 'class': 'pager-link pager-next' }, [
          h('span', { text: 'Next →' }), h('strong', { text: next.title })
        ])
      ])
    ]));

    root.appendChild(frag);
  }

  function renderNotFound() {
    document.title = 'Project not found | Joshua Hanneson';
    root.appendChild(h('section', { 'class': 'proj-head' }, [
      h('div', { 'class': 'container narrow' }, [
        h('h1', { text: 'Project not found' }),
        h('p', { 'class': 'lead', text: 'That project link doesn’t match anything yet.' }),
        h('a', { 'class': 'btn btn-primary', href: 'index.html#work', text: 'See all work' })
      ])
    ]));
  }
})();
