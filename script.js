/* =========================================================
   গাজীর দরগাহ ফয়জাবাদ ফাযিল (বি.এ) মাদ্রাসা — script.js
   Gazir Dargah Foizabad Fazil (B.A.) Madrasha

   WHAT THIS FILE DOES
   1. Site data (gallery, events, notices, downloads, calendar)  ← edit here
   2. Preferences: language (বাংলা/English), day/night theme,
      text size, high contrast, stop-animations (saved in the browser)
   3. Translation of every  data-en="…"  /  data-en-<attribute>="…"  element
   4. Navigation, scroll effects, notices, gallery + lightbox, events, form

   HOW TO UPDATE CONTENT (no HTML editing needed)
   • Photos / videos  → add an object to GALLERY_ITEMS
   • Events           → add an object to EVENTS
   • Notices          → add an object to NOTICES
   • PDFs / forms     → add an object to DOWNLOADS
   • Calendar dates   → add an object to CALENDAR
   Any text field can be a plain string, or { bn: '…', en: '…' } for two languages.
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

  const B = (bn, en) => ({ bn, en });

  const GALLERY_CATEGORIES = {
    all: B('সব', 'All'),
    campus: B('ক্যাম্পাস', 'Campus'),
    learning: B('শিক্ষা', 'Learning'),
    events: B('অনুষ্ঠান', 'Events'),
    video: B('ভিডিও', 'Video')
  };

  /*
    Gallery item fields
      id         unique name
      src        path relative to index.html
      fallbacks  optional alternative paths, tried if src is missing
      type       'image' (default) or 'video'
      category   campus | learning | events | video
      title      short caption (hover + lightbox)
      caption    longer line shown in the lightbox (optional)
      alt        description for screen readers
      shape      optional grid shape: 'wide' | 'tall'
    TO ADD A NEW PHOTO: copy the file into media/, then add one object below.
  */
  const GALLERY_ITEMS = [
    { id: 'campus-1', src: 'media/gdfm_campus(1).png', fallbacks: ['media/gdfm_campus.png'], category: 'campus', shape: 'wide',
      title: B('ক্যাম্পাসের পরিবেশ', 'Campus atmosphere'), caption: B('মাদ্রাসা ক্যাম্পাস', 'The madrasha campus'),
      alt: B('ক্যাম্পাস ভবন', 'Campus building') },
    { id: 'campus-2', src: 'media/gdfm_campus2.png', category: 'campus',
      title: B('ক্যাম্পাস ভবন', 'Campus building'), caption: B('ক্যাম্পাসের আরেকটি দৃশ্য', 'Another view of the campus'),
      alt: B('গাজীর দরগাহ ফয়জাবাদ ফাযিল মাদ্রাসার ক্যাম্পাস', 'Campus of Gazir Dargah Foizabad Fazil Madrasha') },
    { id: 'mosque', src: 'media/gdfm_musgid2.png', category: 'campus', shape: 'tall',
      title: B('মসজিদ', 'Mosque'), caption: B('মাদ্রাসা প্রাঙ্গণের মসজিদ', 'The mosque on the madrasha grounds'),
      alt: B('শিক্ষাপ্রতিষ্ঠানের ভবন ও প্রাঙ্গণ', 'Institution building and grounds') },
    { id: 'classroom', src: 'media/classroom.png', category: 'learning',
      title: B('শ্রেণিকক্ষ', 'Classroom'), caption: B('জ্ঞানের চর্চা আর শ্রদ্ধার মেলবন্ধন', 'Where learning meets respect'),
      alt: B('শ্রেণিকক্ষে শিক্ষার্থীদের শেখার পরিবেশ', 'Students learning in a classroom') },
    { id: 'science-fair-2025', src: 'media/scienceFair_2025.jpeg', category: 'events',
      title: B('বিজ্ঞান মেলা ২০২৫', 'Science Fair 2025'), caption: B('বিজ্ঞানের নতুন আবিষ্কারে, আমরা যাবো অজানারে', 'Discovering the unknown through science'),
      alt: B('বিজ্ঞান মেলা ২০২৫-এ শিক্ষার্থীদের অংশগ্রহণ', 'Students taking part in Science Fair 2025') },
    { id: 'annual-tour-1', src: 'media/annualTour.jpeg', category: 'events', shape: 'wide',
      title: B('বার্ষিক শিক্ষা সফর', 'Annual educational tour'), caption: B('শিক্ষা সফরের স্মৃতি', 'Memories from the tour'),
      alt: B('বার্ষিক শিক্ষা সফরে শিক্ষার্থীরা', 'Students on the annual educational tour') },
    { id: 'annual-tour-2', src: 'media/annualTour2.jpeg', category: 'events',
      title: B('শিক্ষা সফর', 'Educational tour'), caption: B('নতুন দিগন্তের খোঁজে, আমরা এক সাথে', 'Exploring new horizons, together'),
      alt: B('শিক্ষা সফর', 'Educational tour') },
    { id: 'dakhil-2026', src: 'media/dakhil_26.jpeg', category: 'events',
      title: B('দাখিল ২০২৬', 'Dakhil 2026'), caption: B('দাখিল ২০২৬', 'Dakhil 2026'),
      alt: B('দাখিল ২০২৬', 'Dakhil 2026') },
    { id: 'class-9-video', src: 'media/2024_class_9_1.3.mp4', type: 'video', category: 'video',
      title: B('নবম শ্রেণি, ২০২৪', 'Class 9, 2024'), caption: B('নবম শ্রেণির একটি মুহূর্ত (২০২৪)', 'A moment from Class 9 (2024)'),
      alt: B('নবম শ্রেণির ভিডিও, ২০২৪', 'Class 9 video, 2024') }
  ];

  /*
    Event fields: id, title, dateLabel (free text, '' if unknown), description,
    galleryIds (ids from GALLERY_ITEMS; the first is the cover photo).
  */
  const EVENTS = [
    { id: 'science-fair', title: B('বিজ্ঞান মেলা ২০২৫', 'Science Fair 2025'), dateLabel: B('২০২৫', '2025'),
      description: B('বিজ্ঞানের নতুন আবিষ্কারে, আমরা যাবো অজানারে।', 'Discovering the unknown through science.'),
      galleryIds: ['science-fair-2025'] },
    { id: 'annual-tour', title: B('বার্ষিক শিক্ষা সফর', 'Annual educational tour'), dateLabel: '',
      description: B('নতুন দিগন্তের খোঁজে, আমরা এক সাথে।', 'Exploring new horizons, together.'),
      galleryIds: ['annual-tour-1', 'annual-tour-2'] },
    { id: 'dakhil-2026', title: B('দাখিল ২০২৬', 'Dakhil 2026'), dateLabel: B('২০২৬', '2026'),
      description: B('দাখিল ২০২৬ ব্যাচের স্মৃতি।', 'Memories of the Dakhil 2026 batch.'),
      galleryIds: ['dakhil-2026'] }
  ];

  const NOTICE_CATEGORIES = {
    all: B('সব', 'All'),
    admission: B('ভর্তি', 'Admission'),
    academic: B('একাডেমিক', 'Academic'),
    exam: B('পরীক্ষা', 'Examination'),
    result: B('ফলাফল', 'Results'),
    event: B('অনুষ্ঠান', 'Events'),
    recruitment: B('নিয়োগ', 'Recruitment'),
    general: B('সাধারণ', 'General')
  };

  /*
    REAL NOTICES ONLY. Empty on purpose: no fake or demo notices are shown.
    Example entry (copy, edit, paste inside the brackets):
      { id: 'n1', category: 'admission', date: '2026-01-15',
        title:   B('নোটিশের শিরোনাম', 'Notice title'),
        summary: B('সারাংশ', 'Short summary'),
        body:    B('পূর্ণ বিবরণ', 'Full text'),
        file: 'media/docs/notice-1.pdf' }      // "file" only if the PDF really exists
  */
  const NOTICES = [];

  /* Example: { title: B('ভর্তি ফর্ম', 'Admission form'), category: B('ভর্তি', 'Admission'),
                file: 'media/docs/admission-form.pdf', type: 'PDF', size: '250 KB' } */
  const DOWNLOADS = [];

  /* Example: { dateLabel: B('১ জানুয়ারি ২০২৭', '1 January 2027'), title: B('নতুন শিক্ষাবর্ষ শুরু', 'New academic year begins'), note: '' } */
  const CALENDAR = [];

  /* UI strings that JavaScript creates (static HTML text uses data-en instead) */
  const UI = {
    noNoticeTitle: B('এখনো কোনো অফিসিয়াল নোটিশ প্রকাশ করা হয়নি।', 'No official notices have been published yet.'),
    noNoticeBefore: B('সর্বশেষ তথ্যের জন্য ', 'For the latest information, contact the office on '),
    noNoticeAfter: B(' নম্বরে অফিসে যোগাযোগ করুন।', '.'),
    noMatchTitle: B('কোনো নোটিশ পাওয়া যায়নি।', 'No notices found.'),
    noMatchText: B('অন্য শব্দ বা বিভাগ চেষ্টা করুন।', 'Try a different word or category.'),
    noticeCount: (n, l) => (l === 'bn' ? `${toBn(n)}টি নোটিশ` : `${n} notice${n === 1 ? '' : 's'}`),
    details: B('বিস্তারিত', 'Details'),
    pdfOpen: B('PDF ডাউনলোড / দেখুন', 'Download / view PDF'),
    callNow: B('কল করুন', 'Call'),
    noticeBoard: B('নোটিশ বোর্ড', 'Notice board'),
    calEmptyTitle: B('ক্যালেন্ডার এখনো প্রকাশিত হয়নি।', 'The calendar has not been published yet.'),
    calEmptyText: B('অনুমোদিত একাডেমিক ক্যালেন্ডার পাওয়া গেলে এখানে যোগ করা হবে।', 'The approved academic calendar will be added here once available.'),
    dlEmptyTitle: B('এখনো কোনো ফাইল যোগ করা হয়নি।', 'No files have been added yet.'),
    dlEmptyText: B('ভর্তি ফর্ম বা অন্যান্য নথি পাওয়া গেলে এখানে ডাউনলোডের লিংক থাকবে।', 'Download links for admission forms and other documents will appear here.'),
    download: B('ডাউনলোড', 'Download'),
    viewPhotos: (n, l) => (l === 'bn' ? (n > 1 ? `${toBn(n)}টি ছবি দেখুন` : 'ছবি দেখুন') : (n > 1 ? `View ${n} photos` : 'View photo')),
    openPhoto: B('ছবি বড় করে দেখুন', 'Open photo'),
    playVideo: B('ভিডিও চালান', 'Play video'),
    dateTbd: B('তারিখ যোগ হবে', 'Date to be added'),
    noVideo: B('আপনার ব্রাউজার ভিডিও চালাতে পারছে না।', 'Your browser cannot play this video.'),
    lbItem: B('ছবি ও ভিডিও', 'Media'),
    moreNotices: B('আরও নোটিশ দেখুন', 'Show more notices'),
    errStudent: B('শিক্ষার্থীর নাম লিখুন।', "Enter the student's name."),
    errGuardian: B('অভিভাবকের নাম লিখুন।', "Enter the guardian's name."),
    errPhone: B('সঠিক মোবাইল নম্বর দিন, যেমন 01XXXXXXXXX।', 'Enter a valid mobile number, e.g. 01XXXXXXXXX.'),
    errLevel: B('একটি শিক্ষাস্তর নির্বাচন করুন।', 'Select a level.'),
    errConsent: B('এগিয়ে যেতে সম্মতি দিন।', 'Please tick the box to continue.'),
    fixForm: B('ফর্মে কিছু তথ্য সংশোধন করুন।', 'Please correct the highlighted fields.'),
    mailReady: B('আপনার ইমেইল অ্যাপে বার্তা প্রস্তুত করা হয়েছে। বার্তাটি পাঠালে তবেই অফিস তা পাবে। অ্যাপ না খুললে ', 'A message is ready in your email app. The office receives it only after you send it. If the app does not open, '),
    mailLink: B('এখানে চাপুন', 'click here'),
    mailOr: B(' অথবা ', ' or '),
    mailCall: B('নম্বরে ফোন করুন', 'call'),
    themeToNight: B('রাত মোড চালু করুন', 'Switch to night mode'),
    themeToDay: B('দিন মোড চালু করুন', 'Switch to day mode'),
    langSwitch: B('Switch to English', 'বাংলায় দেখুন'),
    labelNight: B('রাত', 'Night'),
    labelDay: B('দিন', 'Day'),
    menuOpen: B('মেনু খুলুন', 'Open menu'),
    menuClose: B('মেনু বন্ধ করুন', 'Close menu'),
    mailSubject: B('ভর্তি সংক্রান্ত জিজ্ঞাসা', 'Admission enquiry'),
    mailGreeting: B('আসসালামু আলাইকুম,', 'Assalamu Alaikum,'),
    mailIntro: B('ভর্তি সংক্রান্ত তথ্য জানতে চাই।', 'I would like to know about admission.'),
    mailStudent: B('শিক্ষার্থীর নাম', "Student's name"),
    mailGuardian: B('অভিভাবকের নাম', "Guardian's name"),
    mailPhone: B('মোবাইল', 'Mobile'),
    mailLevel: B('শিক্ষাস্তর', 'Level'),
    mailQuestion: B('প্রশ্ন', 'Question')
  };

  /* ---------------------------------------------------------
     2. HELPERS
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const root = document.documentElement;
  const systemReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

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

  /* ---------------------------------------------------------
     3. PREFERENCES  (language, theme, text size, contrast, animations)
     --------------------------------------------------------- */
  const PREF_KEY = 'gdfm-prefs';
  let prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(PREF_KEY) || '{}') || {}; } catch (e) { prefs = {}; }
  function savePrefs() { try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch (e) { /* storage blocked: ignore */ } }

  const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  let lang = prefs.lang === 'en' ? 'en' : 'bn';
  const getTheme = () => root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const motionOK = () => !root.classList.contains('no-anim') && !systemReduce.matches;

  /* Pick the right language from a string or { bn, en } */
  const T = v => (v && typeof v === 'object' ? (v[lang] || v.bn || '') : (v || ''));

  const fmtDate = (iso, opts) => {
    const d = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', opts);
  };

  /* ---- Translate static HTML:  data-en="…"  and  data-en-<attr>="…" ---- */
  function translateStatic() {
    $$('[data-en]').forEach(node => {
      if (node.__orig === undefined) node.__orig = node.textContent;
      node.textContent = lang === 'en' ? node.dataset.en : node.__orig;
    });
    $$('*').forEach(node => {
      for (const attr of Array.from(node.attributes)) {
        if (!attr.name.startsWith('data-en-')) continue;
        const target = attr.name.slice(8); // aria-label, alt, title, placeholder, content
        node.__origAttr = node.__origAttr || {};
        if (node.__origAttr[target] === undefined) node.__origAttr[target] = node.getAttribute(target) || '';
        node.setAttribute(target, lang === 'en' ? attr.value : node.__origAttr[target]);
      }
    });
    root.lang = lang;
    root.setAttribute('data-lang', lang);
    const og = $('meta[property="og:locale"]');
    if (og) og.setAttribute('content', lang === 'en' ? 'en_US' : 'bn_BD');
  }

  /* ---- Reflect all preferences on the page and on the controls ---- */
  function syncControls() {
    const dark = getTheme() === 'dark';
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#06130f' : '#0a3a2f');

    // Top-bar buttons
    $$('.js-lang').forEach(btn => {
      btn.setAttribute('aria-label', T(UI.langSwitch));
      const label = $('.lang-label', btn);
      if (label) label.textContent = lang === 'bn' ? 'EN' : 'বাং';
    });
    $$('.js-theme').forEach(btn => {
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute('aria-label', T(dark ? UI.themeToDay : UI.themeToNight));
      const label = $('.theme-label', btn);
      if (label) label.textContent = T(dark ? UI.labelDay : UI.labelNight);
    });

    // Settings panel
    $$('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)));
    $$('[data-set-theme]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setTheme === (dark ? 'dark' : 'light'))));
    $('#contrastBtn').setAttribute('aria-checked', String(root.getAttribute('data-contrast') === 'high'));
    $('#animBtn').setAttribute('aria-checked', String(root.classList.contains('no-anim')));
    const fs = parseInt(root.getAttribute('data-fs') || '0', 10);
    $('#fsDown').disabled = fs <= -1;
    $('#fsUp').disabled = fs >= 3;

    // Drawer button label
    const open = root.classList.contains('nav-open');
    $('#menuToggle').setAttribute('aria-label', T(open ? UI.menuClose : UI.menuOpen));
  }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'bn';
    prefs.lang = lang; savePrefs();
    translateStatic();
    setYear();
    renderDynamic(true);
    syncControls();
    if (lightbox.open) showLightboxItem();
    formStatus.replaceChildren();
    requiredFields.forEach(f => { if (f.getAttribute('aria-invalid')) validateField(f); });
  }
  function setTheme(next) {
    root.setAttribute('data-theme', next === 'dark' ? 'dark' : 'light');
    prefs.theme = getTheme(); savePrefs();
    syncControls();
  }
  function setFontStep(step) {
    const s = Math.max(-1, Math.min(3, step));
    if (s === 0) root.removeAttribute('data-fs'); else root.setAttribute('data-fs', String(s));
    prefs.fs = s === 0 ? undefined : String(s); savePrefs();
    syncControls();
  }
  function setContrast(on) {
    if (on) root.setAttribute('data-contrast', 'high'); else root.removeAttribute('data-contrast');
    prefs.contrast = on ? true : undefined; savePrefs();
    syncControls();
  }
  function setNoAnim(on) {
    root.classList.toggle('no-anim', on);
    prefs.noAnim = on; savePrefs();
    // Make everything visible immediately if animations are switched off
    if (on) $$('[data-reveal]').forEach(n => n.classList.add('is-in'));
    syncControls();
  }
  function resetPrefs() {
    prefs = {}; savePrefs();
    root.removeAttribute('data-fs');
    root.removeAttribute('data-contrast');
    root.classList.toggle('no-anim', systemReduce.matches);
    root.setAttribute('data-theme', systemDark() ? 'dark' : 'light');
    lang = 'bn';
    translateStatic(); setYear(); renderDynamic(true); syncControls();
  }

  /* ---------------------------------------------------------
     4. IMAGES WITH FALLBACKS
     --------------------------------------------------------- */
  function makeImage(item, { lazy = true } = {}) {
    const img = el('img', { src: item.src, alt: T(item.alt) || T(item.title), decoding: 'async', loading: lazy ? 'lazy' : null });
    if (item.fallbacks && item.fallbacks.length) img.dataset.fallbacks = item.fallbacks.join('|');
    return img;
  }
  /* <img data-fallbacks="a|b"> tries each path in turn, then shows a neutral block instead of a broken icon. */
  document.addEventListener('error', event => {
    const target = event.target;
    if (target instanceof HTMLImageElement) {
      const list = (target.dataset.fallbacks || '').split('|').filter(Boolean);
      const next = list.shift();
      if (next) { target.dataset.fallbacks = list.join('|'); target.src = next; }
      else { target.hidden = true; if (target.parentElement) target.parentElement.classList.add('is-missing'); }
    } else if (target instanceof HTMLVideoElement && target.parentElement) {
      target.hidden = true; target.parentElement.classList.add('is-missing');
    }
  }, true);

  /* ---------------------------------------------------------
     5. SCROLL REVEAL
     --------------------------------------------------------- */
  let revealObserver = null;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); obs.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  function registerReveal(scope = document, instant = false) {
    const groups = $$('[data-reveal-group]', scope);
    if (scope.matches && scope.matches('[data-reveal-group]')) groups.push(scope);
    groups.forEach(group => $$('[data-reveal]', group).forEach((child, i) => child.style.setProperty('--i', Math.min(i, 6))));
    const targets = scope.matches && scope.matches('[data-reveal]') ? [scope, ...$$('[data-reveal]', scope)] : $$('[data-reveal]', scope);
    targets.forEach(node => {
      if (instant || !revealObserver || !motionOK()) node.classList.add('is-in');
      else revealObserver.observe(node);
    });
  }

  /* ---------------------------------------------------------
     6. HEADER, NAVIGATION, DRAWER
     --------------------------------------------------------- */
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
    menuToggle.setAttribute('aria-label', T(open ? UI.menuClose : UI.menuOpen));
    scrim.hidden = !open;
    if (open) { const first = $('a, button', mainNav); if (first) first.focus(); }
  }
  menuToggle.addEventListener('click', () => setDrawer(!root.classList.contains('nav-open')));
  scrim.addEventListener('click', () => { setDrawer(false); menuToggle.focus(); });
  desktopMQ.addEventListener('change', () => setDrawer(false));

  const subItems = $$('.has-sub', mainNav);
  function setSub(li, open) {
    li.classList.toggle('open', open);
    $('.nav-link', li).setAttribute('aria-expanded', String(open));
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
      li.addEventListener('mouseenter', () => { if (!desktopMQ.matches) return; clearTimeout(hoverTimer); closeAllSubs(li); setSub(li, true); });
      li.addEventListener('mouseleave', () => { if (!desktopMQ.matches) return; hoverTimer = setTimeout(() => setSub(li, false), 160); });
    }
  });
  document.addEventListener('click', event => {
    if (desktopMQ.matches && !event.target.closest('.has-sub')) closeAllSubs();
  });
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

  /* Active navigation state follows the section in view */
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
      const current = sections.find(s => visible.has(s.id));
      $$('.nav-link, .sub a', mainNav).forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
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
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  /* ---------------------------------------------------------
     7. SCROLL EFFECTS: header shadow, progress bar, back-to-top, parallax
     --------------------------------------------------------- */
  const backTop = $('#backTop');
  const progress = $('#progress');
  const parallaxNodes = $$('[data-parallax]');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    }
    const show = y > 700;
    backTop.hidden = false;
    backTop.classList.toggle('show', show);
    backTop.tabIndex = show ? 0 : -1;

    if (motionOK()) {
      parallaxNodes.forEach(node => {
        const rect = node.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const speed = parseFloat(node.dataset.parallax) || 0.15;
        const shift = Math.max(-30, Math.min(120, rect.top * speed * -1));
        node.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: motionOK() ? 'smooth' : 'auto' });
    const brand = $('#siteHeader a.brand');
    if (brand) brand.focus({ preventScroll: true });
  });

  /* ---------------------------------------------------------
     8. DIALOGS (native <dialog> gives focus trapping + Esc)
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

  /* Service buttons: data-info-bn="Title|Text"  data-info-en="Title|Text" */
  $$('.service-btn[data-info-bn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const raw = btn.getAttribute(lang === 'en' && btn.hasAttribute('data-info-en') ? 'data-info-en' : 'data-info-bn');
      const cut = raw.indexOf('|');
      const title = cut > -1 ? raw.slice(0, cut) : raw;
      const text = cut > -1 ? raw.slice(cut + 1) : '';
      showInfo(title, [
        el('p', { text }),
        el('div', { class: 'info-actions' },
          el('a', { class: 'btn btn-gold', href: `tel:${SITE.phone}`, text: `${T(UI.callNow)}: ${SITE.phoneLabel}` }),
          el('a', { class: 'btn btn-outline', href: '#notices', text: T(UI.noticeBoard), onclick: () => infoDialog.close() }))
      ], btn);
    });
  });

  /* ---------------------------------------------------------
     9. NOTICE BOARD: filter + search + details
     --------------------------------------------------------- */
  const noticeState = { query: '', category: 'all', limit: 6 };
  const noticeList = $('#noticeList');
  const noticeCount = $('#noticeCount');
  const noticeMore = $('#noticeMore');
  const noticeSearch = $('#noticeSearch');
  const noticeCats = $('#noticeCategories');

  function buildChips(container, categories, current, onPick) {
    container.replaceChildren();
    Object.entries(categories).forEach(([key, label]) => {
      const chip = el('button', { class: 'chip', type: 'button', 'aria-pressed': String(key === current), 'data-key': key, text: T(label) });
      chip.addEventListener('click', () => {
        $$('.chip', container).forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
        onPick(key);
      });
      container.append(chip);
    });
  }

  function openNotice(notice, trigger) {
    const nodes = [
      el('p', { class: 'event-date', text: `${T(NOTICE_CATEGORIES[notice.category] || NOTICE_CATEGORIES.general)} · ${fmtDate(notice.date, { day: 'numeric', month: 'long', year: 'numeric' })}` }),
      el('p', { text: T(notice.body) || T(notice.summary) })
    ];
    if (notice.file) {
      nodes.push(el('div', { class: 'info-actions' },
        el('a', { class: 'btn btn-gold', href: notice.file, target: '_blank', rel: 'noopener noreferrer', text: T(UI.pdfOpen) })));
    }
    showInfo(T(notice.title), nodes, trigger);
  }

  function renderNotices() {
    const q = noticeState.query.trim().toLowerCase();
    const sorted = [...NOTICES].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const filtered = sorted.filter(n =>
      (noticeState.category === 'all' || n.category === noticeState.category) &&
      (!q || `${T(n.title)} ${T(n.summary)} ${T(n.body)}`.toLowerCase().includes(q)));

    noticeList.replaceChildren();

    if (!NOTICES.length) {
      noticeList.append(el('div', { class: 'empty' },
        el('strong', { text: T(UI.noNoticeTitle) }),
        T(UI.noNoticeBefore),
        el('a', { href: `tel:${SITE.phone}`, text: SITE.phoneLabel }),
        T(UI.noNoticeAfter)));
      noticeCount.textContent = '';
      noticeMore.hidden = true;
      noticeSearch.disabled = true;
      $$('.chip', noticeCats).forEach(c => { c.disabled = true; });
      return;
    }

    noticeSearch.disabled = false;
    noticeCount.textContent = filtered.length ? UI.noticeCount(filtered.length, lang) : '';
    if (!filtered.length) {
      noticeList.append(el('div', { class: 'empty' }, el('strong', { text: T(UI.noMatchTitle) }), T(UI.noMatchText)));
    }

    filtered.slice(0, noticeState.limit).forEach(n => {
      const d = new Date(`${n.date}T00:00:00`);
      const valid = !Number.isNaN(d.getTime());
      const detailBtn = el('button', { type: 'button', text: T(UI.details) });
      detailBtn.addEventListener('click', () => openNotice(n, detailBtn));
      const actions = el('div', { class: 'notice-actions' }, detailBtn,
        n.file ? el('a', { href: n.file, target: '_blank', rel: 'noopener noreferrer', text: 'PDF' }) : null);

      noticeList.append(el('article', { class: 'notice', 'data-cat': n.category || 'general' },
        el('div', { class: 'notice-date' },
          el('strong', { text: valid ? fmtDate(n.date, { day: 'numeric' }) : '–' }),
          el('span', { text: valid ? fmtDate(n.date, { month: 'short', year: 'numeric' }) : '' })),
        el('div', {},
          el('span', { class: 'notice-tag', text: T(NOTICE_CATEGORIES[n.category] || NOTICE_CATEGORIES.general) }),
          el('h3', { text: T(n.title) }),
          n.summary ? el('p', { text: T(n.summary) }) : null,
          actions)));
    });
    noticeMore.hidden = filtered.length <= noticeState.limit;
    noticeMore.textContent = T(UI.moreNotices);
  }

  let searchTimer;
  noticeSearch.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { noticeState.query = noticeSearch.value; noticeState.limit = 6; renderNotices(); }, 150);
  });
  noticeMore.addEventListener('click', () => { noticeState.limit += 6; renderNotices(); });

  /* ---------------------------------------------------------
     10. CALENDAR + DOWNLOADS
     --------------------------------------------------------- */
  function renderCalendar() {
    const list = $('#calendarList');
    if (!list) return;
    list.replaceChildren();
    if (!CALENDAR.length) {
      list.append(el('li', { class: 'empty' }, el('strong', { text: T(UI.calEmptyTitle) }), T(UI.calEmptyText)));
      return;
    }
    CALENDAR.forEach(item => list.append(el('li', {},
      el('time', { text: T(item.dateLabel) }),
      el('span', { text: item.note ? `${T(item.title)} — ${T(item.note)}` : T(item.title) }))));
  }

  function renderDownloads() {
    const list = $('#downloadList');
    if (!list) return;
    list.replaceChildren();
    if (!DOWNLOADS.length) {
      list.append(el('li', { class: 'empty' }, el('strong', { text: T(UI.dlEmptyTitle) }), T(UI.dlEmptyText)));
      return;
    }
    DOWNLOADS.forEach(file => {
      const meta = [T(file.category), file.size].filter(Boolean).join(' · ');
      list.append(el('li', { class: 'download-item' },
        el('span', { class: 'file-type', 'aria-hidden': 'true', text: file.type || 'FILE' }),
        el('div', {}, el('h3', { text: T(file.title) }), meta ? el('p', { text: meta }) : null),
        el('a', { class: 'btn btn-outline', href: file.file, download: true, text: T(UI.download) })));
    });
  }

  /* ---------------------------------------------------------
     11. LIGHTBOX (images + video) with keyboard and swipe
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
    // Keep a playing video running when only the language changed
    const sameMedia = lbStage.firstElementChild && lbStage.firstElementChild.dataset.id === item.id;
    if (!sameMedia) {
      lbStage.replaceChildren();
      let media;
      if (item.type === 'video') {
        media = el('video', { controls: true, playsinline: true, preload: 'metadata', 'aria-label': T(item.alt) || T(item.title) });
        [item.src, ...(item.fallbacks || [])].forEach(path => media.append(el('source', { src: path, type: 'video/mp4' })));
        media.append(T(UI.noVideo));
      } else {
        media = makeImage(item, { lazy: false });
      }
      media.dataset.id = item.id;
      lbStage.append(media);
    } else if (item.type !== 'video') {
      lbStage.firstElementChild.alt = T(item.alt) || T(item.title);
    }
    const title = T(item.title), caption = T(item.caption);
    lbCaption.textContent = [title, caption && caption !== title ? caption : ''].filter(Boolean).join(' — ');
    const n = lb.items.length;
    lbCount.textContent = lang === 'bn' ? `${toBn(lb.index + 1)} / ${toBn(n)}` : `${lb.index + 1} / ${n}`;
    lbPrev.hidden = n < 2; lbNext.hidden = n < 2;
  }
  function stepLightbox(delta) {
    lb.index = (lb.index + delta + lb.items.length) % lb.items.length;
    showLightboxItem();
  }
  function openLightbox(items, index, trigger) {
    lb.items = items; lb.index = index;
    lbStage.replaceChildren();
    showLightboxItem();
    openDialog(lightbox, trigger);
  }
  lightbox.addEventListener('close', () => lbStage.replaceChildren()); // stops any playing video
  $('#lbClose').addEventListener('click', () => lightbox.close());
  lbPrev.addEventListener('click', () => stepLightbox(-1));
  lbNext.addEventListener('click', () => stepLightbox(1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox || event.target === lbStage) lightbox.close(); });
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
     12. GALLERY + EVENTS
     --------------------------------------------------------- */
  const galleryGrid = $('#galleryGrid');
  const galleryFilters = $('#galleryFilters');
  let galleryCategory = 'all';
  const findItem = id => GALLERY_ITEMS.find(item => item.id === id);

  function renderGallery() {
    buildChips(galleryFilters, GALLERY_CATEGORIES, galleryCategory, key => { galleryCategory = key; renderGalleryTiles(); });
    renderGalleryTiles();
  }
  function renderGalleryTiles() {
    const items = GALLERY_ITEMS.filter(item => galleryCategory === 'all' || item.category === galleryCategory);
    galleryGrid.replaceChildren();
    items.forEach((item, i) => {
      const isVideo = item.type === 'video';
      // "#t=0.5" shows a frame from the video as its thumbnail
      const thumb = isVideo
        ? el('video', { src: `${item.src}#t=0.5`, muted: true, playsinline: true, preload: 'metadata', 'aria-hidden': 'true' })
        : makeImage(item);
      const tile = el('button', {
        class: `g-item${item.shape ? ` ${item.shape}` : ''}`, type: 'button', style: `--i:${Math.min(i, 8)}`,
        'aria-label': `${T(isVideo ? UI.playVideo : UI.openPhoto)}: ${T(item.title)}`
      }, thumb,
        isVideo ? el('span', { class: 'play-badge', 'aria-hidden': 'true' }) : null,
        el('span', { class: 'g-cap', text: T(item.title) }));
      tile.addEventListener('click', () => openLightbox(items, i, tile));
      galleryGrid.append(tile);
    });
  }

  const EVENT_ACCENTS = ['--emerald', '--blue', '--coral', '--plum', '--teal', '--gold'];
  function renderEvents(instant) {
    const grid = $('#eventGrid');
    if (!grid) return;
    grid.replaceChildren();
    EVENTS.forEach((event, index) => {
      const media = event.galleryIds.map(findItem).filter(Boolean);
      if (!media.length) return;
      const title = T(event.title);
      const cardMedia = el('button', { class: 'event-media', type: 'button', 'aria-label': `${title}: ${T(UI.openPhoto)}` }, makeImage(media[0]));
      const openBtn = el('button', { type: 'button', text: UI.viewPhotos(media.length, lang) });
      [cardMedia, openBtn].forEach(btn => btn.addEventListener('click', () => openLightbox(media, 0, btn)));
      const date = T(event.dateLabel);
      grid.append(el('article', { class: 'event-card', 'data-reveal': '', style: `--accent: var(${EVENT_ACCENTS[index % EVENT_ACCENTS.length]})` },
        cardMedia,
        el('div', { class: 'event-body' },
          el('p', { class: `event-date${date ? '' : ' pending'}`, text: date || T(UI.dateTbd) }),
          el('h3', { text: title }),
          el('p', { text: T(event.description) }),
          openBtn)));
    });
    registerReveal(grid, instant);
  }

  /* Rebuild everything that JavaScript renders (used at start-up and on language change) */
  function renderDynamic(instant = false) {
    buildChips(noticeCats, NOTICE_CATEGORIES, noticeState.category, key => { noticeState.category = key; noticeState.limit = 6; renderNotices(); });
    renderNotices();
    renderGallery();
    renderEvents(instant);
    renderCalendar();
    renderDownloads();
  }

  /* ---------------------------------------------------------
     13. ADMISSION ENQUIRY FORM
     No server exists, so the form builds an email in the visitor's own mail app.
     Nothing is stored or transmitted by this website.
     --------------------------------------------------------- */
  const form = $('#enquiryForm');
  const formStatus = $('#formStatus');
  const phonePattern = /^(?:\+?88)?01[3-9]\d{8}$/;
  const requiredFields = $$('[required]', form);

  function setError(input, message) {
    const err = document.getElementById(input.getAttribute('aria-describedby'));
    if (err) err.textContent = message;
    if (message) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    return !message;
  }
  function validateField(input) {
    const value = input.value.trim();
    switch (input.name) {
      case 'student': return setError(input, value.length < 2 ? T(UI.errStudent) : '');
      case 'guardian': return setError(input, value.length < 2 ? T(UI.errGuardian) : '');
      case 'phone': {
        const digits = toEn(value).replace(/[\s-]/g, '');
        return setError(input, phonePattern.test(digits) ? '' : T(UI.errPhone));
      }
      case 'level': return setError(input, value ? '' : T(UI.errLevel));
      case 'consent': return setError(input, input.checked ? '' : T(UI.errConsent));
      default: return true;
    }
  }
  requiredFields.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    const recheck = () => { if (input.getAttribute('aria-invalid')) validateField(input); };
    input.addEventListener('input', recheck);
    input.addEventListener('change', recheck);
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    formStatus.replaceChildren();
    const results = requiredFields.map(validateField);
    if (results.includes(false)) {
      requiredFields[results.indexOf(false)].focus();
      formStatus.textContent = T(UI.fixForm);
      return;
    }
    const data = new FormData(form);
    const levelSelect = $('#fLevel');
    const levelText = levelSelect.selectedOptions[0] ? levelSelect.selectedOptions[0].textContent : data.get('level');
    const body = [
      T(UI.mailGreeting), '', T(UI.mailIntro), '',
      `${T(UI.mailStudent)}: ${data.get('student')}`,
      `${T(UI.mailGuardian)}: ${data.get('guardian')}`,
      `${T(UI.mailPhone)}: ${data.get('phone')}`,
      `${T(UI.mailLevel)}: ${levelText}`,
      data.get('message') ? `${T(UI.mailQuestion)}: ${data.get('message')}` : ''
    ].join('\n').trim();
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(T(UI.mailSubject))}&body=${encodeURIComponent(body)}`;
    formStatus.append(
      T(UI.mailReady),
      el('a', { href: mailto, text: T(UI.mailLink) }),
      T(UI.mailOr),
      el('a', { href: `tel:${SITE.phone}`, text: lang === 'bn' ? `${SITE.phoneLabel} ${T(UI.mailCall)}` : `${T(UI.mailCall)} ${SITE.phoneLabel}` }),
      '.');
    window.location.href = mailto;
  });

  /* "ভর্তির তথ্য" links on each level pre-select that level in the form */
  $$('[data-level]').forEach(link => {
    link.addEventListener('click', () => { const select = $('#fLevel'); if (select) select.value = link.dataset.level; });
  });

  /* ---------------------------------------------------------
     14. SETTINGS PANEL + TOP-BAR TOGGLES
     --------------------------------------------------------- */
  const a11yBtn = $('#a11yBtn');
  const a11yPanel = $('#a11yPanel');
  function setPanel(open) {
    a11yPanel.hidden = !open;
    a11yBtn.setAttribute('aria-expanded', String(open));
    if (open) { const first = $('button', a11yPanel); if (first) first.focus(); }
  }
  a11yBtn.addEventListener('click', () => setPanel(a11yPanel.hidden));
  $('#a11yClose').addEventListener('click', () => { setPanel(false); a11yBtn.focus(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !a11yPanel.hidden) { setPanel(false); a11yBtn.focus(); }
  });
  document.addEventListener('click', event => {
    if (!a11yPanel.hidden && !a11yPanel.contains(event.target) && !a11yBtn.contains(event.target)) setPanel(false);
  });

  $$('.js-lang').forEach(btn => btn.addEventListener('click', () => setLang(lang === 'bn' ? 'en' : 'bn')));
  $$('.js-theme').forEach(btn => btn.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark')));
  $$('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)));
  $$('[data-set-theme]').forEach(b => b.addEventListener('click', () => setTheme(b.dataset.setTheme)));
  const fsStep = () => parseInt(root.getAttribute('data-fs') || '0', 10);
  $('#fsDown').addEventListener('click', () => setFontStep(fsStep() - 1));
  $('#fsUp').addEventListener('click', () => setFontStep(fsStep() + 1));
  $('#fsReset').addEventListener('click', () => setFontStep(0));
  $('#contrastBtn').addEventListener('click', () => setContrast(root.getAttribute('data-contrast') !== 'high'));
  $('#animBtn').addEventListener('click', () => setNoAnim(!root.classList.contains('no-anim')));
  $('#a11yReset').addEventListener('click', resetPrefs);

  // Follow the device's day/night setting until the visitor chooses one themselves
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!prefs.theme) { root.setAttribute('data-theme', e.matches ? 'dark' : 'light'); syncControls(); }
  });

  /* ---------------------------------------------------------
     15. START-UP
     --------------------------------------------------------- */
  const yearNode = $('#year');
  const setYear = () => { if (yearNode) yearNode.textContent = new Date().getFullYear().toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-GB', { useGrouping: false }); };

  $$('.hero-step').forEach((node, i) => node.style.setProperty('--n', i));
  translateStatic();
  setYear();
  renderDynamic(false);
  registerReveal(document);
  syncControls();
  initActiveNav();
  onScroll();

  // Start the hero entrance once the hero photo is ready (never leave the hero hidden)
  let started = false;
  const start = () => { if (!started) { started = true; document.body.classList.add('loaded'); } };
  const heroImg = $('.hero-bg img');
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener('load', start, { once: true });
    heroImg.addEventListener('error', start, { once: true });
    setTimeout(start, 1500);
  } else {
    requestAnimationFrame(start);
  }
})();
