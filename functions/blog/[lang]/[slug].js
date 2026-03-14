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

/* ── Haupt-HTML ── */
function renderHTML(post, lang, m) {
  const tags        = (post.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
  const dateStr     = fmtDate(post.created_at, lang);
  const description = post.excerpt || post.title;
  const canonical   = `https://brawlmystery.pages.dev/blog/${lang}/${post.slug}`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(post.title)} \u2013 BrawlMystery Blog</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="de" href="https://brawlmystery.pages.dev/de/">
  <link rel="alternate" hreflang="en" href="https://brawlmystery.pages.dev/en/">
  <link rel="alternate" hreflang="fr" href="https://brawlmystery.pages.dev/fr/">
  <link rel="alternate" hreflang="es" href="https://brawlmystery.pages.dev/es/">
  <link rel="alternate" hreflang="it" href="https://brawlmystery.pages.dev/it/">

  <meta property="og:type"         content="article">
  <meta property="og:title"        content="${esc(post.title)}">
  <meta property="og:description"  content="${esc(description)}">
  <meta property="og:url"          content="${canonical}">
  <meta property="og:site_name"    content="BrawlMystery">
  <meta property="og:locale"       content="${m.locale}">
  <meta property="og:image"        content="https://brawlmystery.pages.dev/assets/og-image.svg">
  <meta property="article:published_time" content="${post.created_at}">
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${esc(post.title)}">
  <meta name="twitter:description" content="${esc(description)}">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(post.title)},
    "description": ${JSON.stringify(description)},
    "datePublished": "${post.created_at}",
    "dateModified":  "${post.created_at}",
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
        <time class="post-date" itemprop="datePublished" datetime="${post.created_at}">${dateStr}</time>
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

  return new Response(renderHTML(post, lang, m), {
    headers: {
      'Content-Type':  'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=1800',
    },
  });
}
