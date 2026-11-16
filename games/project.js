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
    // encodeURI so file names with spaces (e.g. "early town greyboxing3_annotated.png") still load
    var img = h('img', { src: encodeURI(src), alt: alt || '', loading: 'lazy', width: '1280', height: '800' });
    var media = h('div', { 'class': 'media', 'data-label': label || src.split('/').pop() }, [img]);
    return h('figure', { 'class': 'proj-figure' }, [media, caption ? h('figcaption', { text: caption }) : null]);
  }

  /* Store / itch.io widget, shown under the main image.
     The widget is kept at the exact size its host designed (e.g. 552x167) so it always lays out correctly
     (no blank bar, no cut-off "compact" layout on narrow screens), then scaled down to fit the column. */
  function embedBox(e) {
    var iframe = h('iframe', { src: e.src, width: String(e.width), height: String(e.height), title: e.title || 'Game page' },
      [e.linkUrl ? h('a', { href: e.linkUrl, text: e.linkText || e.linkUrl }) : null]);
    var frame = h('div', { 'class': 'embed-frame', style: 'width:' + e.width + 'px;height:' + e.height + 'px' }, [iframe]);
    var box = h('div', { 'class': 'embed', style: 'max-width:' + e.width + 'px;height:' + e.height + 'px' }, [frame]);

    function fit() {
      var scale = Math.min(1, box.clientWidth / e.width);
      if (!scale) return;
      frame.style.transform = 'scale(' + scale + ')';
      box.style.height = Math.round(e.height * scale) + 'px';
    }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(box);
    window.addEventListener('resize', fit);
    window.setTimeout(fit, 0);
    return box;
  }

  /* Text with [label](https://link) links, built as DOM nodes (no innerHTML) */
  function inline(text) {
    var out = [], re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) out.push(text.slice(last, m.index));
      out.push(h('a', { href: m[2], target: '_blank', rel: 'noopener', text: m[1] }));
      last = re.lastIndex;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  }

  function reveal(node) {
    node.setAttribute('data-reveal', '');
    return node;
  }

  function section(title, children) {
    var kids = [];
    if (title) kids.push(reveal(h('h2', { text: title })));
    children.forEach(function (c) { kids.push(c); });
    return h('section', { 'class': 'proj-section' }, [h('div', { 'class': 'container' }, [h('div', { 'class': 'proj-text' }, kids)])]);
  }

  function paragraphs(list) {
    return (list || []).map(function (t) { return reveal(h('p', { text: t })); });
  }

  /* ---------- page ---------- */

  function render(p) {
    var frag = document.createDocumentFragment();

    function hero(node, kind) { node.setAttribute('data-hero', kind || ''); return node; }

    /* Top of the page: title, overview and facts on the left; main image and store widget on the right
       (stacked on phones, in that order). Animates in on load. */
    var facts = (p.facts || []).map(function (pair) {
      return h('div', {}, [h('dt', { text: pair[0] }), h('dd', { text: pair[1] })]);
    });

    var textCol = h('div', { 'class': 'proj-head-text' }, [
      hero(h('a', { 'class': 'crumb', href: 'index.html#work', text: '← All work' })),
      hero(h('p', { 'class': 'badge', text: p.type })),
      h('h1', { text: p.title, 'data-hero': 'split' })
    ]);
    (p.overview || []).forEach(function (t) { textCol.appendChild(hero(h('p', { 'class': 'proj-overview', text: t }))); });
    if (facts.length) textCol.appendChild(hero(h('dl', { 'class': 'facts' }, facts)));

    var mediaCol = h('div', { 'class': 'proj-head-media' });
    if (p.image) mediaCol.appendChild(hero(figure(p.image, p.imageAlt, '', p.image.split('/').pop()), 'image'));
    if (p.embed) mediaCol.appendChild(hero(embedBox(p.embed), 'image'));

    frag.appendChild(h('section', { 'class': 'proj-head' }, [
      h('div', { 'class': 'container proj-head-grid' }, mediaCol.children.length ? [textCol, mediaCol] : [textCol])
    ]));

    /* Highlights (short bullets) */
    if (p.highlights && p.highlights.length) {
      frag.appendChild(section('Highlights', [
        h('ul', { 'class': 'bullets', 'data-reveal': '' }, p.highlights.map(function (t) { return h('li', { text: t }); }))
      ]));
    }

    /* Sections: text on one side, images on the other */
    if (p.sections && p.sections.length) {
      p.sections.forEach(function (s) {
        var texts = [].concat(s.text || []);
        var textBlock = h('div', { 'class': 'proj-text', 'data-reveal': '' },
          [s.title ? h('h2', { text: s.title }) : null].concat(texts.map(function (t) { return h('p', {}, inline(t)); })));
        var images = (s.images || []).map(function (im) { return figure(im.src, im.alt, im.caption); });
        var kids = [textBlock];
        if (images.length) {
          kids.push(h('div', { 'class': 'proj-media layout-' + (s.layout || 'stack'), 'data-reveal-group': '' }, images));
        }
        frag.appendChild(h('section', { 'class': 'proj-section' }, [
          h('div', { 'class': 'container' }, [
            h('div', { 'class': 'proj-split side-' + (s.side === 'left' ? 'left' : 'right') + (images.length ? '' : ' no-media') + (s.layout === 'trio' ? ' wide-media' : '') }, kids)
          ])
        ]));
      });
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
