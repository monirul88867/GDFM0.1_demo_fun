/* =========================================================
   গাজীর দরগাহ ফয়জাবাদ ফাযিল (বি.এ) মাদ্রাসা — script.js

   HOW TO UPDATE CONTENT (no HTML editing needed):
   • Gallery photos/videos  → add an object to GALLERY_ITEMS
   • Events                 → add an object to EVENTS
   • Notices                → add an object to NOTICES
   • Downloads (PDF forms)  → add an object to DOWNLOADS
   • Academic calendar      → add an object to CALENDAR
   Put the actual files in the media/ folder (or media/docs/ for PDFs).
   ========================================================= */
(() => {
  'use strict';

  /* ---------------------------------------------------------
     1. SITE DATA
     --------------------------------------------------------- */
  const SITE = {
    email: 'gazirdargahffmadrasha@gmail.com',
    phone: '+8801309115770',
    phoneLabel: '+880 1309-115770'
  };

  const GALLERY_CATEGORIES = {
    all: 'সব',
    campus: 'ক্যাম্পাস',
    learning: 'শিক্ষা',
    events: 'অনুষ্ঠান',
    video: 'ভিডিও'
  };

  /*
    Gallery item fields:
      id         unique name
      src        path relative to index.html
      fallbacks  optional alternative paths tried if src is missing
      type       'image' (default) or 'video'
      category   one of the keys above (except "all")
      title      short caption shown on hover and in the lightbox
      caption    longer line shown in the lightbox (optional)
      alt        description for screen readers (images)
      shape      optional grid shape: 'wide' | 'tall'
    TO ADD A NEW PHOTO: copy the file into media/, then add one object below.
  */
  const GALLERY_ITEMS = [
    { id: 'campus-1', src: 'media/gdfm_campus(1).png', fallbacks: ['media/gdfm_campus.png'], category: 'campus', title: 'ক্যাম্পাসের পরিবেশ', caption: 'মাদ্রাসা ক্যাম্পাস', alt: 'ক্যাম্পাস ভবন', shape: 'wide' },
    { id: 'campus-2', src: 'media/gdfm_campus2.png', category: 'campus', title: 'ক্যাম্পাস ভবন', caption: 'ক্যাম্পাসের আরেকটি দৃশ্য', alt: 'গাজীর দরগাহ ফয়জাবাদ ফাযিল মাদ্রাসার ক্যাম্পাস' },
    { id: 'mosque', src: 'media/gdfm_musgid2.png', category: 'campus', title: 'মসজিদ', caption: 'মাদ্রাসা প্রাঙ্গণের মসজিদ', alt: 'শিক্ষাপ্রতিষ্ঠানের ভবন ও প্রাঙ্গণ', shape: 'tall' },
    { id: 'classroom', src: 'media/classroom.png', category: 'learning', title: 'শ্রেণিকক্ষ', caption: 'জ্ঞানের চর্চা আর শ্রদ্ধার মেলবন্ধন', alt: 'শ্রেণিকক্ষে শিক্ষার্থীদের শেখার পরিবেশ' },
    { id: 'science-fair-2025', src: 'media/scienceFair_2025.jpeg', category: 'events', title: 'বিজ্ঞান মেলা ২০২৫', caption: 'বিজ্ঞানের নতুন আবিষ্কারে, আমরা যাবো অজানারে', alt: 'বিজ্ঞান মেলা ২০২৫-এ শিক্ষার্থীদের অংশগ্রহণ' },
    { id: 'annual-tour-1', src: 'media/annualTour.jpeg', category: 'events', title: 'বার্ষিক শিক্ষা সফর', caption: 'শিক্ষা সফরের স্মৃতি', alt: 'বার্ষিক শিক্ষা সফরে শিক্ষার্থীরা', shape: 'wide' },
    { id: 'annual-tour-2', src: 'media/annualTour2.jpeg', category: 'events', title: 'শিক্ষা সফর', caption: 'নতুন দিগন্তের খোঁজে, আমরা এক সাথে', alt: 'শিক্ষা সফর' },
    { id: 'dakhil-2026', src: 'media/dakhil_26.jpeg', category: 'events', title: 'দাখিল ২০২৬', caption: 'দাখিল ২০২৬', alt: 'দাখিল ২০২৬' },
    { id: 'class-9-video', src: 'media/2024_class_9_1.3.mp4', type: 'video', category: 'video', title: 'নবম শ্রেণি, ২০২৪', caption: 'নবম শ্রেণির একটি মুহূর্ত (২০২৪)', alt: 'নবম শ্রেণির ভিডিও, ২০২৪' }
  ];

  /*
    Event fields: id, title, dateLabel (free text such as "২০২৫"; leave '' if unknown),
    description, galleryIds (ids from GALLERY_ITEMS; the first one is the cover photo).
  */
  const EVENTS = [
    { id: 'science-fair', title: 'বিজ্ঞান মেলা ২০২৫', dateLabel: '২০২৫', description: 'বিজ্ঞানের নতুন আবিষ্কারে, আমরা যাবো অজানারে।', galleryIds: ['science-fair-2025'] },
    { id: 'annual-tour', title: 'বার্ষিক শিক্ষা সফর', dateLabel: '', description: 'নতুন দিগন্তের খোঁজে, আমরা এক সাথে।', galleryIds: ['annual-tour-1', 'annual-tour-2'] },
    { id: 'dakhil-2026', title: 'দাখিল ২০২৬', dateLabel: '২০২৬', description: 'দাখিল ২০২৬ ব্যাচের স্মৃতি।', galleryIds: ['dakhil-2026'] }
  ];

  const NOTICE_CATEGORIES = {
    all: 'সব',
    admission: 'ভর্তি',
    academic: 'একাডেমিক',
    exam: 'পরীক্ষা',
    result: 'ফলাফল',
    event: 'অনুষ্ঠান',
    recruitment: 'নিয়োগ',
    general: 'সাধারণ'
  };

  /*
    REAL NOTICES ONLY. Empty on purpose: no fake or demo notices are shown.
    Example of one entry (copy, edit, and paste inside the brackets):
      { id: 'n1', title: 'নোটিশের শিরোনাম', category: 'admission', date: '2026-01-15',
        summary: 'এক-দুই লাইনের সারাংশ', body: 'পূর্ণ বিবরণ', file: 'media/docs/notice-1.pdf' }
    "file" is optional; add it only when the PDF really exists.
  */
  const NOTICES = [];

  /* Example: { title: 'ভর্তি ফর্ম', category: 'ভর্তি', file: 'media/docs/admission-form.pdf', type: 'PDF', size: '250 KB' } */
  const DOWNLOADS = [];

  /* Example: { dateLabel: '১ জানুয়ারি ২০২৭', title: 'নতুন শিক্ষাবর্ষ শুরু', note: '' } */
  const CALENDAR = [];

  /* ---------------------------------------------------------
     2. HELPERS
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Create an element safely (text is never parsed as HTML). */
  function el(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    }
    children.flat().forEach(child => { if (child !== null && child !== undefined) node.append(child); });
    return node;
  }

  const toBn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
  const toEn = s => String(s).replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d));

  function parseDate(iso) {
    const d = new Date(`${iso}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const fmtFull = iso => {
    const d = parseDate(iso);
    return d ? d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : iso;
  };

  function findItem(id) { return GALLERY_ITEMS.find(item => item.id === id); }

  /* Image that tries fallback paths, then shows a neutral green block instead of a broken icon. */
  function makeImage(item, { lazy = true } = {}) {
    const img = el('img', {
      src: item.src,
      alt: item.alt || item.title || '',
      decoding: 'async',
      loading: lazy ? 'lazy' : null
    });
    if (item.fallbacks && item.fallbacks.length) img.dataset.fallbacks = item.fallbacks.join('|');
    return img;
  }

  /* Global handler: <img data-fallbacks="a|b"> falls back one path at a time. */
  document.addEventListener('error', event => {
    const target = event.target;
    if (target instanceof HTMLImageElement) {
      const list = (target.dataset.fallbacks || '').split('|').filter(Boolean);
      const next = list.shift();
      if (next) {
        target.dataset.fallbacks = list.join('|');
        target.src = next;
      } else {
        target.hidden = true;
        if (target.parentElement) target.parentElement.classList.add('is-missing');
      }
    } else if (target instanceof HTMLVideoElement && target.parentElement) {
      target.hidden = true;
      target.parentElement.classList.add('is-missing');
    }
  }, true);

  /* ---------------------------------------------------------
     3. SCROLL REVEAL (observer is reused for dynamic content)
     --------------------------------------------------------- */
  let revealObserver = null;
  if ('IntersectionObserver' in window && !reduceMotion) {
    revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }

  function registerReveal(root = document) {
    // Stagger children inside a group
    const groups = $$('[data-reveal-group]', root);
    if (root.matches && root.matches('[data-reveal-group]')) groups.push(root);
    groups.forEach(group => {
      $$('[data-reveal]', group).forEach((child, i) => child.style.setProperty('--i', Math.min(i, 6)));
    });
    const targets = root.matches && root.matches('[data-reveal]') ? [root, ...$$('[data-reveal]', root)] : $$('[data-reveal]', root);
    targets.forEach(node => {
      if (revealObserver) revealObserver.observe(node);
      else node.classList.add('is-in');
    });
  }

  /* ---------------------------------------------------------
     4. HEADER, NAVIGATION, DRAWER
     --------------------------------------------------------- */
  const root = document.documentElement;
  const header = $('#siteHeader');
  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');
  const scrim = $('#navScrim');
  const desktopMQ = window.matchMedia('(min-width: 1240px)');

  function setDrawer(open) {
    if (desktopMQ.matches) open = false;
    root.classList.toggle('nav-open', open);
    root.classList.toggle('lock', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন');
    scrim.hidden = !open;
    if (open) {
      const first = $('a, button', mainNav);
      if (first) first.focus();
    }
  }

  menuToggle.addEventListener('click', () => setDrawer(!root.classList.contains('nav-open')));
  scrim.addEventListener('click', () => { setDrawer(false); menuToggle.focus(); });
  desktopMQ.addEventListener('change', () => setDrawer(false));

  /* Dropdowns: click/tap, keyboard, hover on desktop with a mouse */
  const subItems = $$('.has-sub', mainNav);
  function setSub(li, open) {
    li.classList.toggle('open', open);
    const btn = $('.nav-link', li);
    btn.setAttribute('aria-expanded', String(open));
  }
  function closeAllSubs(except) { subItems.forEach(li => { if (li !== except) setSub(li, false); }); }

  subItems.forEach(li => {
    const btn = $('.nav-link', li);
    const links = $$('.sub a', li);
    let hoverTimer;

    btn.addEventListener('click', () => {
      const willOpen = !li.classList.contains('open');
      if (desktopMQ.matches) closeAllSubs(li);
      setSub(li, willOpen);
    });

    li.addEventListener('keydown', event => {
      const index = links.indexOf(document.activeElement);
      if (event.key === 'Escape' && li.classList.contains('open')) {
        setSub(li, false); btn.focus(); event.stopPropagation();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (!li.classList.contains('open')) setSub(li, true);
        (links[index + 1] || links[0]).focus();
      } else if (event.key === 'ArrowUp' && index >= 0) {
        event.preventDefault();
        (links[index - 1] || btn).focus();
      }
    });

    li.addEventListener('focusout', event => {
      if (desktopMQ.matches && !li.contains(event.relatedTarget)) setSub(li, false);
    });

    if (window.matchMedia('(hover: hover)').matches) {
      li.addEventListener('mouseenter', () => {
        if (!desktopMQ.matches) return;
        clearTimeout(hoverTimer); closeAllSubs(li); setSub(li, true);
      });
      li.addEventListener('mouseleave', () => {
        if (!desktopMQ.matches) return;
        hoverTimer = setTimeout(() => setSub(li, false), 160);
      });
    }
  });

  document.addEventListener('click', event => {
    if (desktopMQ.matches && !event.target.closest('.has-sub')) closeAllSubs();
  });

  /* Close drawer when a link is chosen; Escape closes the drawer; Tab stays inside it */
  mainNav.addEventListener('click', event => {
    if (event.target.closest('a')) { setDrawer(false); closeAllSubs(); }
  });
  document.addEventListener('keydown', event => {
    if (!root.classList.contains('nav-open')) return;
    if (event.key === 'Escape') { setDrawer(false); menuToggle.focus(); return; }
    if (event.key === 'Tab') {
      const focusable = [menuToggle, ...$$('a, button', mainNav).filter(n => n.offsetParent !== null)];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  /* Active navigation state: follow the section currently in view */
  function initActiveNav() {
    const linkMap = new Map();
    $$('a[href^="#"]', mainNav).forEach(a => {
      const id = a.getAttribute('href').slice(1);
      if (id && id !== 'top') linkMap.set(id, a);
    });
    const homeLink = $('a[href="#top"]', mainNav);
    const sections = [...linkMap.keys()].map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const visible = new Set();
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
      // Pick the first section (in page order) that is visible
      const current = sections.find(s => visible.has(s.id));
      $$('.nav-link, .sub a', mainNav).forEach(a => a.classList.remove('active'));
      subItems.forEach(li => li.classList.remove('has-active'));
      if (current) {
        const link = linkMap.get(current.id);
        link.classList.add('active');
        link.setAttribute('aria-current', 'location');
        const parent = link.closest('.has-sub');
        if (parent) parent.classList.add('has-active');
      } else if (homeLink) {
        homeLink.classList.add('active');
      }
      $$('[aria-current="location"]', mainNav).forEach(a => { if (!a.classList.contains('active')) a.removeAttribute('aria-current'); });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  /* ---------------------------------------------------------
     5. SCROLL EFFECTS: header shadow, back-to-top, gentle parallax
     --------------------------------------------------------- */
  const backTop = $('#backTop');
  const parallaxNodes = $$('[data-parallax]');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    const show = y > 700;
    backTop.hidden = false;
    backTop.classList.toggle('show', show);
    backTop.tabIndex = show ? 0 : -1;

    if (!reduceMotion) {
      parallaxNodes.forEach(node => {
        const rect = node.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return; // only animate near the viewport
        const speed = parseFloat(node.dataset.parallax) || 0.15;
        const shift = Math.max(-30, Math.min(120, rect.top * speed * -1)); // stay inside the image's spare edge
        node.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    const top = $('#siteHeader a.brand');
    if (top) top.focus({ preventScroll: true });
  });

  /* ---------------------------------------------------------
     6. DIALOG HELPERS (native <dialog> gives focus trapping and Esc)
     --------------------------------------------------------- */
  function openDialog(dialog, returnFocusTo) {
    if (typeof dialog.showModal !== 'function') { dialog.setAttribute('open', ''); return; }
    dialog._returnFocus = returnFocusTo || document.activeElement;
    dialog.showModal();
    root.classList.add('lock');
    dialog.addEventListener('close', () => {
      root.classList.remove('lock');
      if (dialog._returnFocus && document.contains(dialog._returnFocus)) dialog._returnFocus.focus({ preventScroll: true });
    }, { once: true });
  }

  /* Info dialog: used for notice details and service status messages */
  const infoDialog = $('#infoDialog');
  const infoTitle = $('#infoTitle');
  const infoBody = $('#infoBody');
  $('#infoClose').addEventListener('click', () => infoDialog.close());
  infoDialog.addEventListener('click', event => { if (event.target === infoDialog) infoDialog.close(); });

  function showInfo(title, nodes, trigger) {
    infoTitle.textContent = title;
    infoBody.replaceChildren(...nodes);
    openDialog(infoDialog, trigger);
  }

  $$('.service-btn[data-info-title]').forEach(btn => {
    btn.addEventListener('click', () => {
      showInfo(btn.dataset.infoTitle, [
        el('p', { text: btn.dataset.infoText }),
        el('div', { class: 'info-actions' },
          el('a', { class: 'btn btn-gold', href: `tel:${SITE.phone}`, text: `কল করুন: ${SITE.phoneLabel}` }),
          el('a', { class: 'btn btn-outline', href: '#notices', text: 'নোটিশ বোর্ড', onclick: () => infoDialog.close() }))
      ], btn);
    });
  });

  /* ---------------------------------------------------------
     7. NOTICE BOARD: filter + search + details
     --------------------------------------------------------- */
  const noticeState = { query: '', category: 'all', limit: 6 };
  const noticeList = $('#noticeList');
  const noticeCount = $('#noticeCount');
  const noticeMore = $('#noticeMore');
  const noticeSearch = $('#noticeSearch');
  const noticeCats = $('#noticeCategories');

  function buildChips(container, categories, onPick, startKey = 'all') {
    container.replaceChildren();
    Object.entries(categories).forEach(([key, label]) => {
      const chip = el('button', { class: 'chip', type: 'button', 'aria-pressed': String(key === startKey), 'data-key': key, text: label });
      chip.addEventListener('click', () => {
        $$('.chip', container).forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
        onPick(key);
      });
      container.append(chip);
    });
  }

  function openNotice(notice, trigger) {
    const nodes = [
      el('p', { class: 'event-date', text: `${NOTICE_CATEGORIES[notice.category] || 'সাধারণ'} · ${fmtFull(notice.date)}` }),
      el('p', { text: notice.body || notice.summary || '' })
    ];
    if (notice.file) {
      nodes.push(el('div', { class: 'info-actions' },
        el('a', { class: 'btn btn-gold', href: notice.file, target: '_blank', rel: 'noopener noreferrer', text: 'PDF ডাউনলোড / দেখুন' })));
    }
    showInfo(notice.title, nodes, trigger);
  }

  function renderNotices() {
    const q = noticeState.query.trim().toLowerCase();
    const sorted = [...NOTICES].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const filtered = sorted.filter(n =>
      (noticeState.category === 'all' || n.category === noticeState.category) &&
      (!q || `${n.title} ${n.summary || ''} ${n.body || ''}`.toLowerCase().includes(q)));

    noticeList.replaceChildren();

    if (!NOTICES.length) {
      noticeList.append(el('div', { class: 'empty' },
        el('strong', { text: 'এখনো কোনো অফিসিয়াল নোটিশ প্রকাশ করা হয়নি।' }),
        'সর্বশেষ তথ্যের জন্য ',
        el('a', { href: `tel:${SITE.phone}`, text: SITE.phoneLabel }),
        ' নম্বরে অফিসে যোগাযোগ করুন।'));
      noticeCount.textContent = '';
      noticeMore.hidden = true;
      noticeSearch.disabled = true;
      $$('.chip', noticeCats).forEach(c => { c.disabled = true; });
      return;
    }

    const visible = filtered.slice(0, noticeState.limit);
    noticeCount.textContent = filtered.length ? `${toBn(filtered.length)}টি নোটিশ` : '';
    if (!filtered.length) {
      noticeList.append(el('div', { class: 'empty' }, el('strong', { text: 'কোনো নোটিশ পাওয়া যায়নি।' }), 'অন্য শব্দ বা বিভাগ চেষ্টা করুন।'));
    }

    visible.forEach(n => {
      const d = parseDate(n.date);
      const detailBtn = el('button', { type: 'button', text: 'বিস্তারিত' });
      detailBtn.addEventListener('click', () => openNotice(n, detailBtn));
      const actions = el('div', { class: 'notice-actions' }, detailBtn,
        n.file ? el('a', { href: n.file, target: '_blank', rel: 'noopener noreferrer', text: 'PDF' }) : null);

      noticeList.append(el('article', { class: 'notice' },
        el('div', { class: 'notice-date' },
          el('strong', { text: d ? d.toLocaleDateString('bn-BD', { day: 'numeric' }) : '–' }),
          el('span', { text: d ? d.toLocaleDateString('bn-BD', { month: 'short', year: 'numeric' }) : '' })),
        el('div', {},
          el('span', { class: 'notice-tag', text: NOTICE_CATEGORIES[n.category] || 'সাধারণ' }),
          el('h3', { text: n.title }),
          n.summary ? el('p', { text: n.summary }) : null,
          actions)));
    });

    noticeMore.hidden = filtered.length <= noticeState.limit;
  }

  buildChips(noticeCats, NOTICE_CATEGORIES, key => { noticeState.category = key; noticeState.limit = 6; renderNotices(); });
  let searchTimer;
  noticeSearch.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { noticeState.query = noticeSearch.value; noticeState.limit = 6; renderNotices(); }, 150);
  });
  noticeMore.addEventListener('click', () => { noticeState.limit += 6; renderNotices(); });
  renderNotices();

  /* ---------------------------------------------------------
     8. CALENDAR + DOWNLOADS (rendered from data)
     --------------------------------------------------------- */
  (function renderCalendar() {
    const list = $('#calendarList');
    if (!list) return;
    if (!CALENDAR.length) {
      list.append(el('li', { class: 'empty' }, el('strong', { text: 'ক্যালেন্ডার এখনো প্রকাশিত হয়নি।' }), 'অনুমোদিত একাডেমিক ক্যালেন্ডার পাওয়া গেলে এখানে যোগ করা হবে।'));
      return;
    }
    CALENDAR.forEach(item => list.append(el('li', {},
      el('time', { text: item.dateLabel }),
      el('span', { text: item.note ? `${item.title} — ${item.note}` : item.title }))));
  })();

  (function renderDownloads() {
    const list = $('#downloadList');
    if (!list) return;
    if (!DOWNLOADS.length) {
      list.append(el('li', { class: 'empty' }, el('strong', { text: 'এখনো কোনো ফাইল যোগ করা হয়নি।' }), 'ভর্তি ফর্ম বা অন্যান্য নথি পাওয়া গেলে এখানে ডাউনলোডের লিংক থাকবে।'));
      return;
    }
    DOWNLOADS.forEach(file => {
      const meta = [file.category, file.size].filter(Boolean).join(' · ');
      list.append(el('li', { class: 'download-item' },
        el('span', { class: 'file-type', 'aria-hidden': 'true', text: file.type || 'FILE' }),
        el('div', {}, el('h3', { text: file.title }), meta ? el('p', { text: meta }) : null),
        el('a', { class: 'btn btn-outline', href: file.file, download: true, text: 'ডাউনলোড' })));
    });
  })();

  /* ---------------------------------------------------------
     9. LIGHTBOX (images + video), keyboard and swipe support
     --------------------------------------------------------- */
  const lightbox = $('#lightbox');
  const lbStage = $('#lbStage');
  const lbCaption = $('#lbCaption');
  const lbCount = $('#lbCount');
  const lbPrev = $('#lbPrev');
  const lbNext = $('#lbNext');
  const lb = { items: [], index: 0 };

  function showLightboxItem() {
    const item = lb.items[lb.index];
    if (!item) return;
    lbStage.replaceChildren();
    let media;
    if (item.type === 'video') {
      media = el('video', { controls: true, playsinline: true, preload: 'metadata', 'aria-label': item.alt || item.title });
      [item.src, ...(item.fallbacks || [])].forEach(path => media.append(el('source', { src: path, type: 'video/mp4' })));
      media.append('আপনার ব্রাউজার ভিডিও চালাতে পারছে না।');
    } else {
      media = makeImage(item, { lazy: false });
    }
    lbStage.append(media);
    lbCaption.textContent = [item.title, item.caption && item.caption !== item.title ? item.caption : ''].filter(Boolean).join(' — ');
    lbCount.textContent = `${toBn(lb.index + 1)} / ${toBn(lb.items.length)}`;
    const single = lb.items.length < 2;
    lbPrev.hidden = single; lbNext.hidden = single;
  }

  function stepLightbox(delta) {
    lb.index = (lb.index + delta + lb.items.length) % lb.items.length;
    showLightboxItem();
  }
  function openLightbox(items, index, trigger) {
    lb.items = items; lb.index = index;
    showLightboxItem();
    openDialog(lightbox, trigger);
  }

  lightbox.addEventListener('close', () => { lbStage.replaceChildren(); }); // stops any playing video
  $('#lbClose').addEventListener('click', () => lightbox.close());
  lbPrev.addEventListener('click', () => stepLightbox(-1));
  lbNext.addEventListener('click', () => stepLightbox(1));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target === lbStage) lightbox.close();
  });
  lightbox.addEventListener('keydown', event => {
    if (lb.items.length < 2) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); stepLightbox(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); stepLightbox(1); }
  });
  let touchX = null;
  lightbox.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    if (touchX === null || lb.items.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  /* ---------------------------------------------------------
     10. GALLERY (category filter + reusable tiles)
     --------------------------------------------------------- */
  const galleryGrid = $('#galleryGrid');
  const galleryFilters = $('#galleryFilters');
  let galleryCategory = 'all';

  function renderGallery() {
    const items = GALLERY_ITEMS.filter(item => galleryCategory === 'all' || item.category === galleryCategory);
    galleryGrid.replaceChildren();
    items.forEach((item, i) => {
      let thumb;
      if (item.type === 'video') {
        // "#t=0.5" shows a frame from the video as its thumbnail
        thumb = el('video', { src: `${item.src}#t=0.5`, muted: true, playsinline: true, preload: 'metadata', 'aria-hidden': 'true' });
      } else {
        thumb = makeImage(item);
      }
      const tile = el('button', {
        class: `g-item${item.shape ? ` ${item.shape}` : ''}`,
        type: 'button',
        style: `--i:${Math.min(i, 8)}`,
        'aria-label': `${item.type === 'video' ? 'ভিডিও চালান' : 'ছবি বড় করে দেখুন'}: ${item.title}`
      }, thumb,
        item.type === 'video' ? el('span', { class: 'play-badge', 'aria-hidden': 'true' }) : null,
        el('span', { class: 'g-cap', text: item.title }));
      tile.addEventListener('click', () => openLightbox(items, i, tile));
      galleryGrid.append(tile);
    });
  }
  buildChips(galleryFilters, GALLERY_CATEGORIES, key => { galleryCategory = key; renderGallery(); });
  renderGallery();

  /* ---------------------------------------------------------
     11. EVENTS (built from EVENTS + GALLERY_ITEMS)
     --------------------------------------------------------- */
  (function renderEvents() {
    const grid = $('#eventGrid');
    if (!grid) return;
    EVENTS.forEach(event => {
      const media = event.galleryIds.map(findItem).filter(Boolean);
      if (!media.length) return;
      const cover = media[0];
      const cardMedia = el('button', { class: 'event-media', type: 'button', 'aria-label': `${event.title}: ছবি দেখুন` }, makeImage(cover));
      const openBtn = el('button', { type: 'button', text: media.length > 1 ? `${toBn(media.length)}টি ছবি দেখুন` : 'ছবি দেখুন' });
      [cardMedia, openBtn].forEach(btn => btn.addEventListener('click', () => openLightbox(media, 0, btn)));

      grid.append(el('article', { class: 'event-card', 'data-reveal': '' },
        cardMedia,
        el('div', { class: 'event-body' },
          el('p', { class: `event-date${event.dateLabel ? '' : ' pending'}`, text: event.dateLabel || 'তারিখ যোগ হবে' }),
          el('h3', { text: event.title }),
          el('p', { text: event.description }),
          openBtn)));
    });
    registerReveal(grid);
  })();

  /* ---------------------------------------------------------
     12. ADMISSION ENQUIRY FORM
     No server exists, so the form builds an email in the visitor's own mail app.
     Nothing is stored or transmitted by this website.
     --------------------------------------------------------- */
  const form = $('#enquiryForm');
  const formStatus = $('#formStatus');
  const phonePattern = /^(?:\+?88)?01[3-9]\d{8}$/;

  function setError(input, message) {
    const err = document.getElementById(input.getAttribute('aria-describedby'));
    if (err) err.textContent = message;
    if (message) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    return !message;
  }

  function validateField(input) {
    const value = input.value.trim();
    switch (input.name) {
      case 'student': return setError(input, value.length < 2 ? 'শিক্ষার্থীর নাম লিখুন।' : '');
      case 'guardian': return setError(input, value.length < 2 ? 'অভিভাবকের নাম লিখুন।' : '');
      case 'phone': {
        const digits = toEn(value).replace(/[\s-]/g, '');
        return setError(input, phonePattern.test(digits) ? '' : 'সঠিক মোবাইল নম্বর দিন, যেমন 01XXXXXXXXX।');
      }
      case 'level': return setError(input, value ? '' : 'একটি শিক্ষাস্তর নির্বাচন করুন।');
      case 'consent': return setError(input, input.checked ? '' : 'এগিয়ে যেতে সম্মতি দিন।');
      default: return true;
    }
  }

  const requiredFields = $$('[required]', form);
  requiredFields.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => { if (input.getAttribute('aria-invalid')) validateField(input); });
    input.addEventListener('change', () => { if (input.getAttribute('aria-invalid')) validateField(input); });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    formStatus.replaceChildren();
    const results = requiredFields.map(validateField);
    if (results.includes(false)) {
      const firstBad = requiredFields[results.indexOf(false)];
      firstBad.focus();
      formStatus.textContent = 'ফর্মে কিছু তথ্য সংশোধন করুন।';
      return;
    }
    const data = new FormData(form);
    const body = [
      'আসসালামু আলাইকুম,',
      '',
      'ভর্তি সংক্রান্ত তথ্য জানতে চাই।',
      '',
      `শিক্ষার্থীর নাম: ${data.get('student')}`,
      `অভিভাবকের নাম: ${data.get('guardian')}`,
      `মোবাইল: ${data.get('phone')}`,
      `শিক্ষাস্তর: ${data.get('level')}`,
      data.get('message') ? `প্রশ্ন: ${data.get('message')}` : ''
    ].filter((line, i, arr) => line !== '' || arr[i - 1] !== '').join('\n');
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent('ভর্তি সংক্রান্ত জিজ্ঞাসা')}&body=${encodeURIComponent(body)}`;

    formStatus.append(
      'আপনার ইমেইল অ্যাপে বার্তা প্রস্তুত করা হয়েছে। বার্তাটি পাঠালে তবেই অফিস তা পাবে। অ্যাপ না খুললে ',
      el('a', { href: mailto, text: 'এখানে চাপুন' }),
      ' অথবা ',
      el('a', { href: `tel:${SITE.phone}`, text: `${SITE.phoneLabel} নম্বরে ফোন করুন` }),
      '।');
    window.location.href = mailto;
  });

  /* "ভর্তির তথ্য" links on each level pre-select that level in the form */
  $$('[data-level]').forEach(link => {
    link.addEventListener('click', () => {
      const select = $('#fLevel');
      if (select) select.value = link.dataset.level;
    });
  });

  /* ---------------------------------------------------------
     13. START-UP
     --------------------------------------------------------- */
  const yearNode = $('#year');
  if (yearNode) yearNode.textContent = new Date().getFullYear().toLocaleString('bn-BD', { useGrouping: false });

  $$('.hero-step').forEach((node, i) => node.style.setProperty('--n', i));
  registerReveal(document);
  initActiveNav();
  onScroll();

  // Start the hero entrance once the page (and the hero photo) is ready
  let started = false;
  const start = () => { if (!started) { started = true; document.body.classList.add('loaded'); } };
  const heroImg = $('.hero-bg img');
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener('load', start, { once: true });
    heroImg.addEventListener('error', start, { once: true });
    setTimeout(start, 1500); // never leave the hero hidden
  } else {
    requestAnimationFrame(start);
  }
})();
