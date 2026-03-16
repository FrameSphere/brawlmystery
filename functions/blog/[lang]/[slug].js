// ── Cloudflare Pages Function ─────────────────────────────────────
// Route: /blog/[lang]/[slug]
// Server-Side Rendered Blog-Post-Seite – BrawlMystery Style
// ─────────────────────────────────────────────────────────────────

const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'brawlmystery';

const LANG_META = {
  de: { home:'/de/', blogHome:'/blog/', locale:'de_DE',
        back:'Zurück zum Spiel', backBlog:'← Blog',
        readMore:'Mehr Artikel', notFound:'Artikel nicht gefunden.',
        notFoundSub:'Dieser Artikel existiert nicht oder wurde entfernt.',
        siteName:'BrawlMystery', play:'🎮 Jetzt spielen →' },
  en: { home:'/en/', blogHome:'/blog/', locale:'en_US',
        back:'Back to Game', backBlog:'← Blog',
        readMore:'More Articles', notFound:'Article not found.',
        notFoundSub:'This article does not exist or has been removed.',
        siteName:'BrawlMystery', play:'🎮 Play now →' },
  fr: { home:'/fr/', blogHome:'/blog/', locale:'fr_FR',
        back:'Retour au jeu', backBlog:'← Blog',
        readMore:"Plus d'articles", notFound:'Article introuvable.',
        notFoundSub:"Cet article n'existe pas ou a \u00e9t\u00e9 supprim\u00e9.",
        siteName:'BrawlMystery', play:'🎮 Jouer →' },
  es: { home:'/es/', blogHome:'/blog/', locale:'es_ES',
        back:'Volver al juego', backBlog:'← Blog',
        readMore:'M\u00e1s art\u00edculos', notFound:'Art\u00edculo no encontrado.',
        notFoundSub:'Este art\u00edculo no existe o ha sido eliminado.',
        siteName:'BrawlMystery', play:'🎮 Jugar →' },
  it: { home:'/it/', blogHome:'/blog/', locale:'it_IT',
        back:'Torna al gioco', backBlog:'← Blog',
        readMore:'Altri articoli', notFound:'Articolo non trovato.',
        notFoundSub:"Questo articolo non esiste o \u00e8 stato rimosso.",
        siteName:'BrawlMystery', play:'🎮 Gioca →' },
};

function fmtDate(d, lang) {
  const loc = { de:'de-DE', en:'en-GB', fr:'fr-FR', es:'es-ES', it:'it-IT' };
  return new Date(d).toLocaleDateString(loc[lang]||'en-GB',
    { year:'numeric', month:'long', day:'numeric' });
}

function esc(s) {
  return String(s||'')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const FB_API  = 'https://webcontrol-hq-api.karol-paschek.workers.dev/api/blog/feedback';
const ANA_API = 'https://webcontrol-hq-api.karol-paschek.workers.dev/api/blog/analytics';

function blogAnalyticsScript(postId, postSlug, lang, siteId) {
  return `<script>
(function(){
  var ANA='${ANA_API}';
  var SID=localStorage.getItem('_ba_sid');
  if(!SID){SID=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('_ba_sid',SID);}
  var DEV=/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)?'mobile':'desktop';
  var REF=document.referrer||'';
  var START=Date.now();
  var sent=false;
  fetch(ANA,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({site_id:'${siteId}',post_id:${postId},post_slug:'${postSlug}',lang:'${lang}',event:'pageview',referrer:REF,device:DEV,session_id:SID})}).catch(function(){});
  var maxScroll=0;
  var milestones={25:false,50:false,75:false,100:false};
  function onScroll(){var el=document.querySelector('.blog-post-body,.post-body');if(!el)return;var r=el.getBoundingClientRect();var pct=Math.min(100,Math.round((window.innerHeight-r.top)/(r.height||1)*100));if(pct>maxScroll)maxScroll=pct;[25,50,75,100].forEach(function(m){if(!milestones[m]&&maxScroll>=m){milestones[m]=true;fetch(ANA,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({site_id:'${siteId}',post_id:${postId},post_slug:'${postSlug}',lang:'${lang}',event:'scroll',scroll_depth:m,session_id:SID})}).catch(function(){});}});}
  window.addEventListener('scroll',onScroll,{passive:true});
  function sendTime(){if(sent)return;sent=true;var sec=Math.round((Date.now()-START)/1000);if(sec<2)return;navigator.sendBeacon(ANA,JSON.stringify({site_id:'${siteId}',post_id:${postId},post_slug:'${postSlug}',lang:'${lang}',event:'leave',time_on_page:sec,scroll_depth:maxScroll,session_id:SID}));}
  window.addEventListener('pagehide',sendTime);
  window.addEventListener('beforeunload',sendTime);
  document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')sendTime();});
})();
<\/script>`;
}

function feedbackWidget(postId, postSlug, lang, siteId) {
  const labels = {
    question: { de:'War dieser Artikel hilfreich?', en:'Was this article helpful?', fr:'Cet article \u00e9tait-il utile\u00a0?', es:'\u00bfFue \u00fatil este art\u00edculo?', it:'Questo articolo ti \u00e8 stato utile?' },
    yes:      { de:'Ja', en:'Yes', fr:'Oui', es:'S\u00ed', it:'S\u00ec' },
    no:       { de:'Nein', en:'No', fr:'Non', es:'No', it:'No' },
    thanks:   { de:'\uD83D\uDE4F Danke f\u00fcr dein Feedback!', en:'\uD83D\uDE4F Thanks for your feedback!', fr:'\uD83D\uDE4F Merci pour ton retour\u00a0!', es:'\uD83D\uDE4F \u00a1Gracias por tu opini\u00f3n!', it:'\uD83D\uDE4F Grazie per il tuo feedback!' },
  };
  const q = (labels.question[lang] || labels.question.en);
  const y = (labels.yes[lang]      || labels.yes.en);
  const n = (labels.no[lang]       || labels.no.en);
  const t = (labels.thanks[lang]   || labels.thanks.en);
  const key = `fb_${postId}_${lang}`;
  return `
<div id="feedback-widget" style="margin-top:2rem;padding:1.25rem 1.5rem;border:1px solid rgba(255,215,0,.15);border-radius:12px;background:rgba(255,215,0,.04);display:none;text-align:center">
  <p id="fb-question" style="font-size:.88rem;color:rgba(255,255,255,.6);margin:0 0 .9rem">${q}</p>
  <div id="fb-buttons" style="display:flex;gap:.75rem;justify-content:center">
    <button onclick="sendFeedback(true)" style="padding:8px 24px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.6);cursor:pointer;font-size:.88rem;transition:all .2s;font-family:inherit" onmouseover="this.style.background='rgba(34,197,94,.12)';this.style.borderColor='rgba(34,197,94,.3)';this.style.color='#4ade80'" onmouseout="this.style.background='transparent';this.style.borderColor='rgba(255,255,255,.15)';this.style.color='rgba(255,255,255,.6)'">\uD83D\uDC4D ${y}</button>
    <button onclick="sendFeedback(false)" style="padding:8px 24px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.6);cursor:pointer;font-size:.88rem;transition:all .2s;font-family:inherit" onmouseover="this.style.background='rgba(239,68,68,.10)';this.style.borderColor='rgba(239,68,68,.25)';this.style.color='#f87171'" onmouseout="this.style.background='transparent';this.style.borderColor='rgba(255,255,255,.15)';this.style.color='rgba(255,255,255,.6)'">\uD83D\uDC4E ${n}</button>
  </div>
  <p id="fb-thanks" style="display:none;font-size:.88rem;color:#4ade80;margin:0">${t}</p>
</div>
<script>
(function(){
  var KEY='${key}';
  if(localStorage.getItem(KEY))return;
  var body=document.querySelector('.post-body');
  if(!body)return;
  var shown=false;
  function check(){
    if(shown)return;
    var r=body.getBoundingClientRect();
    if((window.innerHeight-r.top)/r.height>=0.6){shown=true;document.getElementById('feedback-widget').style.display='block';}
  }
  window.addEventListener('scroll',check,{passive:true});
  check();
})();
function sendFeedback(helpful){
  var KEY='${key}';
  if(localStorage.getItem(KEY))return;
  localStorage.setItem(KEY,'1');
  document.getElementById('fb-buttons').style.display='none';
  document.getElementById('fb-question').style.display='none';
  document.getElementById('fb-thanks').style.display='block';
  fetch('${FB_API}',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({site_id:'${siteId}',post_id:${postId},post_slug:'${postSlug}',lang:'${lang}',helpful:helpful?1:0})}).catch(function(){});
}
<\/script>`;
}

/* ── Haupt-HTML ── */
function renderHTML(post, lang, m, siblings) {
  const tags        = (post.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
  const dateStr     = fmtDate(post.published_at || post.created_at, lang);
  const description = post.excerpt || post.title;
  const canonical   = `https://brawlmystery.pages.dev/blog/${lang}/${post.slug}`;
  const BASE = 'https://brawlmystery.pages.dev';
  const hreflangs = siblings.map(s =>
    `  <link rel="alternate" hreflang="${s.lang}" href="${BASE}/blog/${s.lang}/${s.slug}">`
  ).join('\n');
  const enVersion = siblings.find(s => s.lang === 'en');
  const xDefault = enVersion
    ? `  <link rel="alternate" hreflang="x-default" href="${BASE}/blog/en/${enVersion.slug}">`
    : `  <link rel="alternate" hreflang="x-default" href="${BASE}/blog/">`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(post.title)} \u2013 BrawlMystery Blog</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">

  <meta property="og:type"         content="article">
  <meta property="og:title"        content="${esc(post.title)}">
  <meta property="og:description"  content="${esc(description)}">
  <meta property="og:url"          content="${canonical}">
  <meta property="og:site_name"    content="BrawlMystery">
  <meta property="og:locale"       content="${m.locale}">
  <meta property="og:image"        content="https://brawlmystery.pages.dev/assets/og-image.svg">
  <meta property="article:published_time" content="${post.published_at || post.created_at}">
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${esc(post.title)}">
  <meta name="twitter:description" content="${esc(description)}">
${hreflangs}
${xDefault}

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(post.title)},
    "description": ${JSON.stringify(description)},
    "datePublished": "${post.published_at || post.created_at}",
    "dateModified":  "${post.published_at || post.created_at}",
    "author":    { "@type": "Organization", "name": "BrawlMystery" },
    "publisher": { "@type": "Organization", "name": "BrawlMystery",
                   "url": "https://brawlmystery.pages.dev" },
    "url": "${canonical}",
    "inLanguage": "${lang}",
    "image": "https://brawlmystery.pages.dev/assets/og-image.svg",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "${canonical}" }
  }
  <\/script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "BrawlMystery",
        "item": "https://brawlmystery.pages.dev/" },
      { "@type": "ListItem", "position": 2, "name": "Blog",
        "item": "https://brawlmystery.pages.dev/blog/" },
      { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(post.title)},
        "item": "${canonical}" }
    ]
  }
  <\/script>

  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">

  <!-- BrawlMystery Fonts & Base Styles -->
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/seo-pages.css">

  <style>
    /* ── CSS-Variablen ── */
    :root {
      --accent: #ffd700;
      --text-primary: #ffffff;
      --text-secondary: rgba(255,255,255,0.65);
      --font-headline: 'BrawlStarsHeadline','Impact','Arial Black',sans-serif;
    }

    /* ── Guide-Body: dunkle Box wie Index ── */
    .guide-body-wrap {
      background: rgba(20,20,40,0.85);
      border-radius: 16px;
      padding: 28px 24px 32px;
      border: 2px solid rgba(138,43,226,0.4);
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      margin-top: 8px;
    }

    /* ── Post-Header ── */
    .post-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .post-tag {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 20px;
      background: rgba(255,215,0,0.12);
      color: #ffd700;
      border: 1px solid rgba(255,215,0,0.25);
      text-decoration: none;
      transition: background .2s;
    }
    .post-tag:hover { background: rgba(255,215,0,0.22); }

    .post-date {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.35);
    }

    .post-title {
      font-family: 'BrawlStarsHeadline','Impact','Arial Black',sans-serif;
      font-size: clamp(1.4rem, 4vw, 1.9rem);
      font-weight: 900;
      color: #ffd700;
      line-height: 1.25;
      margin: 0 0 10px;
      text-shadow: 2px 2px 0 rgba(0,0,0,0.7);
    }

    /* ── Excerpt (Blockquote-Stil) ── */
    .post-excerpt {
      font-size: 0.95rem;
      color: rgba(255,255,255,0.6);
      line-height: 1.75;
      border-left: 3px solid rgba(138,43,226,0.6);
      padding-left: 14px;
      margin: 0 0 24px;
    }

    /* ── Trennlinie ── */
    .post-divider {
      border: none;
      border-top: 1px solid rgba(138,43,226,0.25);
      margin: 24px 0;
    }

    /* ── Artikel-Body ── */
    .post-body {
      font-family: 'BrawlStarsText','Segoe UI',sans-serif;
      font-size: 0.95rem;
      line-height: 1.8;
      color: rgba(255,255,255,0.65);
    }
    .post-body h2 {
      font-family: 'BrawlStarsHeadline','Impact','Arial Black',sans-serif;
      font-size: 1.25rem;
      font-weight: 900;
      color: #ffd700;
      margin: 2rem 0 0.7rem;
      border-bottom: 1px solid rgba(255,215,0,0.2);
      padding-bottom: 5px;
      text-shadow: 1px 1px 0 rgba(0,0,0,0.6);
    }
    .post-body h3 {
      font-family: 'BrawlStarsText','Segoe UI',sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
      margin: 1.5rem 0 0.5rem;
    }
    .post-body p   { margin-bottom: 1rem; }
    .post-body ul,
    .post-body ol  { padding-left: 1.4rem; margin-bottom: 1rem; }
    .post-body li  { margin-bottom: 0.4rem; }
    .post-body strong { color: #ffffff; }
    .post-body a   { color: #ffd700; text-decoration: none; }
    .post-body a:hover { text-decoration: underline; }
    .post-body hr  { border: none; border-top: 1px solid rgba(138,43,226,0.25); margin: 2rem 0; }

    /* ── Back-Button ── */
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 28px;
      padding: 10px 20px;
      border-radius: 10px;
      background: rgba(255,215,0,0.1);
      border: 1px solid rgba(255,215,0,0.35);
      color: #ffd700;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.88rem;
      transition: background .2s, border-color .2s;
    }
    .back-btn:hover {
      background: rgba(255,215,0,0.2);
      border-color: rgba(255,215,0,0.6);
      text-decoration: none;
    }

    /* ── Footer ── */
    .footer {
      max-width: 800px;
      margin: 20px auto 0;
      border-radius: 12px;
    }
  </style>
</head>
<body>

  <!-- Sprach-Navigation (Pill) -->
  <nav class="language-selector">
    <div class="language-selector-inner">
      <a href="/de/" class="lang-link${lang==='de'?' active':''}" title="Deutsch">&#127465;&#127466; DE</a>
      <a href="/en/" class="lang-link${lang==='en'?' active':''}" title="English">&#127468;&#127463; EN</a>
      <a href="/fr/" class="lang-link${lang==='fr'?' active':''}" title="Fran\u00e7ais">&#127467;&#127479; FR</a>
      <a href="/es/" class="lang-link${lang==='es'?' active':''}" title="Espa\u00f1ol">&#127466;&#127480; ES</a>
      <a href="/it/" class="lang-link${lang==='it'?' active':''}" title="Italiano">&#127470;&#127481; IT</a>
    </div>
  </nav>

  <article class="guide-container" itemscope itemtype="https://schema.org/Article">

    <!-- Zurück-Leiste -->
    <div class="back-bar">
      <a href="${m.blogHome}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>${m.backBlog}</span>
      </a>
    </div>

    <div class="guide-body-wrap">

      <!-- Meta: Tags + Datum -->
      <div class="post-meta">
        ${tags.map(t => `<a href="${m.blogHome}?tag=${encodeURIComponent(t)}" class="post-tag">${esc(t)}</a>`).join('')}
        <time class="post-date" itemprop="datePublished" datetime="${post.published_at || post.created_at}">${dateStr}</time>
      </div>

      <!-- Titel -->
      <h1 class="post-title" itemprop="headline">${esc(post.title)}</h1>

      <!-- Excerpt -->
      ${post.excerpt ? `<p class="post-excerpt" itemprop="description">${esc(post.excerpt)}</p>` : ''}

      <hr class="post-divider">

      <!-- Artikel-Inhalt -->
      <div class="post-body" itemprop="articleBody">
        ${post.content || `<p>${esc(post.excerpt||'')}</p>`}
      </div>

      <hr class="post-divider">

      <!-- CTA-Buttons -->
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:28px; align-items:center;">
        <a href="${m.blogHome}" class="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          ${m.readMore}
        </a>
        <a href="${m.home}" class="back-btn" style="background:rgba(138,43,226,0.15);border-color:rgba(138,43,226,0.5);color:#bb86fc;">
          ${m.play}
        </a>
      </div>

    ${feedbackWidget(post.id, post.slug, lang, SITE_ID)}

    </div><!-- /.guide-body-wrap -->
  </article>

  <!-- Footer -->
  <footer class="footer">
    <a href="${m.home}" class="footer-link">Spiel</a>
    <span class="footer-separator">\u00b7</span>
    <a href="/blog/" class="footer-link">Blog</a>
    <span class="footer-separator">\u00b7</span>
    <a href="/impressum.html" class="footer-link">Impressum</a>
    <span class="footer-separator">\u00b7</span>
    <a href="/datenschutz.html" class="footer-link">Datenschutz</a>
  </footer>

  <script src="/js/ui.js" defer><\/script>
  ${blogAnalyticsScript(post.id, post.slug, lang, SITE_ID)}

</body>
</html>`;
}

/* ── 404-Seite ── */
function render404(lang, m) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 \u2013 BrawlMystery Blog</title>
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/seo-pages.css">
  <style>
    :root { --accent:#ffd700; --text-primary:#ffffff; --text-secondary:rgba(255,255,255,0.65); }
    .guide-body-wrap {
      background: rgba(20,20,40,0.85);
      border: 2px solid rgba(138,43,226,0.4);
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }
    .not-found-icon { font-size: 3rem; margin-bottom: 16px; text-align: center; }
    .not-found-title { font-family:'BrawlStarsHeadline','Impact',sans-serif; color:#ffd700; font-size:1.6rem; text-align:center; margin-bottom:10px; }
    .not-found-sub { color:rgba(255,255,255,0.5); font-size:0.9rem; text-align:center; margin-bottom:24px; }
  </style>
</head>
<body>
  <nav class="language-selector">
    <div class="language-selector-inner">
      <a href="/de/" class="lang-link">&#127465;&#127466; DE</a>
      <a href="/en/" class="lang-link">&#127468;&#127463; EN</a>
      <a href="/fr/" class="lang-link">&#127467;&#127479; FR</a>
      <a href="/es/" class="lang-link">&#127466;&#127480; ES</a>
      <a href="/it/" class="lang-link">&#127470;&#127481; IT</a>
    </div>
  </nav>
  <div class="guide-container">
    <div class="back-bar">
      <a href="${m.blogHome}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>${m.backBlog}</span>
      </a>
    </div>
    <div class="guide-body-wrap">
      <div class="not-found-icon">&#128680;</div>
      <h1 class="not-found-title">404 \u2013 ${m.notFound}</h1>
      <p class="not-found-sub">${m.notFoundSub}</p>
      <div style="text-align:center;">
        <a href="${m.blogHome}" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.35);color:#ffd700;text-decoration:none;font-weight:600;font-size:0.88rem;">
          \u2190 ${m.readMore}
        </a>
      </div>
    </div>
  </div>
  <script src="/js/ui.js" defer><\/script>
</body>
</html>`;
}

/* ── Request Handler ── */
export async function onRequestGet({ params }) {
  const { lang, slug } = params;
  const VALID = ['de', 'en', 'fr', 'es', 'it'];
  if (!VALID.includes(lang)) return new Response('Not Found', { status: 404 });

  const m = LANG_META[lang];

  let post;
  try {
    const res = await fetch(
      `${API}/api/blog/post?site_id=${SITE_ID}&lang=${lang}&slug=${encodeURIComponent(slug)}`
    );
    if (res.status === 404) {
      return new Response(render404(lang, m), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    if (!res.ok) throw new Error('API ' + res.status);
    post = await res.json();
  } catch (e) {
    return new Response(render404(lang, m), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  let siblings = [{ lang, slug }];
  if (post.group_id) {
    try {
      const sr = await fetch(`${API}/api/blog/group?site_id=${SITE_ID}&group_id=${encodeURIComponent(post.group_id)}`);
      if (sr.ok) siblings = await sr.json();
    } catch(_) {}
  }

  return new Response(renderHTML(post, lang, m, siblings), {
    headers: {
      'Content-Type':  'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=1800',
    },
  });
}
