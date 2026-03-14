// ── Cloudflare Pages Function ─────────────────────────────────────
// Route: /blog/[lang]/[slug]
// Server-Side Rendered Blog-Post-Seite für SEO + AdSense
// ─────────────────────────────────────────────────────────────────

const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'brawlmystery';

const LANG_META = {
  de: { home:'/de/', blogHome:'/blog/', locale:'de_DE',
        readMore:'Mehr Artikel',      notFound:'Artikel nicht gefunden.',
        notFoundSub:'Dieser Artikel existiert nicht oder wurde entfernt.',
        siteName:'BrawlMystery' },
  en: { home:'/en/', blogHome:'/blog/', locale:'en_US',
        readMore:'More Articles',     notFound:'Article not found.',
        notFoundSub:'This article does not exist or has been removed.',
        siteName:'BrawlMystery' },
  fr: { home:'/fr/', blogHome:'/blog/', locale:'fr_FR',
        readMore:"Plus d'articles",   notFound:'Article introuvable.',
        notFoundSub:"Cet article n'existe pas ou a \u00e9t\u00e9 supprim\u00e9.",
        siteName:'BrawlMystery' },
  es: { home:'/es/', blogHome:'/blog/', locale:'es_ES',
        readMore:'M\u00e1s art\u00edculos', notFound:'Art\u00edculo no encontrado.',
        notFoundSub:'Este art\u00edculo no existe o ha sido eliminado.',
        siteName:'BrawlMystery' },
  it: { home:'/it/', blogHome:'/blog/', locale:'it_IT',
        readMore:'Altri articoli',    notFound:'Articolo non trovato.',
        notFoundSub:"Questo articolo non esiste o \u00e8 stato rimosso.",
        siteName:'BrawlMystery' },
};

function fmtDate(d, lang) {
  const loc = { de:'de-DE', en:'en-GB', fr:'fr-FR', es:'es-ES', it:'it-IT' };
  return new Date(d).toLocaleDateString(loc[lang]||'en-GB', { year:'numeric', month:'long', day:'numeric' });
}

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderHTML(post, lang, m) {
  const tags       = (post.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
  const dateStr    = fmtDate(post.created_at, lang);
  const description = post.excerpt || post.title;
  const canonical  = `https://brawlmystery.pages.dev/blog/${lang}/${post.slug}`;

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
  </script>

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
  </script>

  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3654554314003005" crossorigin="anonymous"></script>

  <style>
    :root { --bg:#1a1a2e; --surface:#0f0f1e; --accent:#f97316;
            --text1:#f1f1f1; --text2:#a1a1aa; --border:rgba(249,115,22,0.25); }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           background:var(--bg); color:var(--text1); min-height:100vh; }

    header { background:var(--surface); border-bottom:1px solid var(--border);
             padding:14px 24px; display:flex; align-items:center; justify-content:space-between; }
    .logo  { font-size:20px; font-weight:800; color:var(--accent); text-decoration:none; }
    .back-link { color:var(--text2); text-decoration:none; font-size:14px; transition:color .2s; }
    .back-link:hover { color:var(--accent); }

    .post-page  { max-width:760px; margin:0 auto; padding:2rem 1.5rem 4rem; }
    .post-nav   { display:flex; align-items:center; justify-content:space-between;
                  flex-wrap:wrap; gap:10px; margin-bottom:2rem; }
    .post-nav a { color:var(--text2); text-decoration:none; font-size:14px; transition:color .2s; }
    .post-nav a:hover { color:var(--accent); }
    .post-meta  { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:1rem; }
    .post-tag   { font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px;
                  background:rgba(249,115,22,.18); color:#fb923c;
                  text-decoration:none; }
    .post-tag:hover { background:rgba(249,115,22,.28); }
    .post-date  { font-size:13px; color:var(--text2); }
    .post-title { font-size:clamp(1.6rem,4vw,2.2rem); font-weight:800; line-height:1.25;
                  margin:0 0 1rem; }
    .post-excerpt { font-size:1.05rem; color:var(--text2); line-height:1.7;
                    border-left:3px solid var(--accent); padding-left:1rem; margin-bottom:2rem; }
    .post-body  { font-size:1rem; line-height:1.8; color:var(--text2); }
    .post-body h2 { font-size:1.4rem; font-weight:700; color:var(--text1); margin:2rem 0 .75rem; }
    .post-body h3 { font-size:1.15rem; font-weight:700; color:var(--text1); margin:1.5rem 0 .5rem; }
    .post-body p  { margin-bottom:1.1rem; }
    .post-body ul, .post-body ol { padding-left:1.4rem; margin-bottom:1.1rem; }
    .post-body li { margin-bottom:.4rem; }
    .post-body strong { color:var(--text1); }
    .post-body a      { color:var(--accent); }
    .post-body hr     { border:none; border-top:1px solid var(--border); margin:2rem 0; }
    .divider    { border:none; border-top:1px solid var(--border); margin:2.5rem 0; }
    .ad-slot    { margin:2rem 0; text-align:center; min-height:90px; }
    .back-btn   { display:inline-flex; align-items:center; gap:6px; margin-top:2.5rem;
                  padding:10px 20px; border-radius:8px;
                  background:rgba(249,115,22,.12); color:var(--accent);
                  text-decoration:none; font-weight:600; font-size:14px; transition:background .2s; }
    .back-btn:hover { background:rgba(249,115,22,.22); }

    footer { text-align:center; padding:28px 24px; color:var(--text2); font-size:13px;
             border-top:1px solid var(--border); margin-top:48px; }
    footer a { color:var(--text2); text-decoration:none; }
    footer a:hover { color:var(--accent); }
    .sep { margin:0 8px; }
  </style>
</head>
<body>

<header>
  <a href="${m.home}" class="logo">\u2694\ufe0f BrawlMystery</a>
  <a href="${m.blogHome}" class="back-link">\u2190 Blog</a>
</header>

<article class="post-page" itemscope itemtype="https://schema.org/Article">

  <nav class="post-nav" aria-label="Breadcrumb">
    <a href="${m.home}">BrawlMystery</a>
    <a href="${m.blogHome}">\u2190 Blog</a>
  </nav>

  <header>
    <div class="post-meta">
      ${tags.map(t => `<a href="${m.blogHome}?tag=${encodeURIComponent(t)}" class="post-tag">${esc(t)}</a>`).join('')}
      <time class="post-date" itemprop="datePublished" datetime="${post.created_at}">${dateStr}</time>
    </div>
    <h1 class="post-title" itemprop="headline">${esc(post.title)}</h1>
    ${post.excerpt ? `<p class="post-excerpt" itemprop="description">${esc(post.excerpt)}</p>` : ''}
  </header>

  <div class="ad-slot">
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3654554314003005"
         data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
  </div>

  <hr class="divider">

  <div class="post-body" itemprop="articleBody">
    ${post.content || `<p>${esc(post.excerpt||'')}</p>`}
  </div>

  <hr class="divider">

  <div class="ad-slot">
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3654554314003005"
         data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
  </div>

  <a href="${m.blogHome}" class="back-btn">\u2190 ${m.readMore}</a>

</article>

<footer>
  <a href="${m.home}">BrawlMystery</a>
  <span class="sep">\u00b7</span>
  <a href="/blog/">Blog</a>
  <span class="sep">\u00b7</span>
  <a href="/impressum.html">Impressum</a>
  <span class="sep">\u00b7</span>
  <a href="/datenschutz.html">Datenschutz</a>
  <p style="margin-top:10px">\u00a9 2026 BrawlMystery</p>
</footer>

</body>
</html>`;
}

function render404(lang, m) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 \u2013 BrawlMystery Blog</title>
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <style>
    body { font-family:-apple-system,sans-serif; background:#1a1a2e; color:#f1f1f1; display:flex; align-items:center; justify-content:center; min-height:100vh; }
    .wrap { max-width:500px; text-align:center; padding:2rem; }
    h1 { font-size:2rem; font-weight:800; margin-bottom:1rem; color:#f97316; }
    p  { color:#a1a1aa; margin-bottom:2rem; }
    a  { display:inline-block; padding:10px 24px; border-radius:8px;
         background:rgba(249,115,22,.12); color:#f97316; text-decoration:none; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>404 \u2013 ${m.notFound}</h1>
    <p>${m.notFoundSub}</p>
    <a href="${m.blogHome}">\u2190 ${m.readMore}</a>
  </div>
</body>
</html>`;
}

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
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
