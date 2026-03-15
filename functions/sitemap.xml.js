// Dynamic Sitemap – BrawlMystery
const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'brawlmystery';
const BASE    = 'https://brawlmystery.pages.dev';
const LANGS   = ['de', 'en', 'fr', 'es', 'it'];

function altLinks(map) {
  const enHref = map['en'] || Object.values(map)[0];
  return Object.entries(map).map(([l, href]) =>
    `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`
  ).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}"/>`;
}

function staticUrl(loc, lastmod, freq, prio, alts = '') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
${alts}
  </url>`;
}

const homeLangs = Object.fromEntries(LANGS.map(l => [l, `${BASE}/${l}/`]));

// Helper: same slug across all langs
function sameSlug(slug, prio = '0.7') {
  return LANGS.map(l => staticUrl(
    `${BASE}/${l}/${slug}`, '2026-03-11', 'monthly', prio,
    altLinks(Object.fromEntries(LANGS.map(ll => [ll, `${BASE}/${ll}/${slug}`])))
  )).join('\n');
}

const STATIC_ENTRIES = [
  staticUrl(`${BASE}/`, '2026-02-25', 'daily', '1.0'),
  ...LANGS.map(l => staticUrl(`${BASE}/${l}/`, '2026-02-25', 'daily', '1.0', altLinks(homeLangs))),

  // Blog listing
  staticUrl(`${BASE}/blog/`, '2026-03-15', 'weekly', '0.8'),

  // Library + Guide (same slug all langs)
  sameSlug('library.html', '0.8'),
  sameSlug('guide.html',   '0.8'),

  // Content pages – mixed slugs
  staticUrl(`${BASE}/de/beste-brawler-2026`,          '2026-03-11', 'monthly', '0.8', altLinks({ de:`${BASE}/de/beste-brawler-2026`, en:`${BASE}/en/best-brawlers-2026`, fr:`${BASE}/fr/best-brawlers-2026`, es:`${BASE}/es/best-brawlers-2026`, it:`${BASE}/it/best-brawlers-2026` })),
  staticUrl(`${BASE}/en/best-brawlers-2026`,          '2026-03-11', 'monthly', '0.8', altLinks({ de:`${BASE}/de/beste-brawler-2026`, en:`${BASE}/en/best-brawlers-2026`, fr:`${BASE}/fr/best-brawlers-2026`, es:`${BASE}/es/best-brawlers-2026`, it:`${BASE}/it/best-brawlers-2026` })),
  staticUrl(`${BASE}/fr/best-brawlers-2026`,          '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/beste-brawler-2026`, en:`${BASE}/en/best-brawlers-2026`, fr:`${BASE}/fr/best-brawlers-2026`, es:`${BASE}/es/best-brawlers-2026`, it:`${BASE}/it/best-brawlers-2026` })),
  staticUrl(`${BASE}/es/best-brawlers-2026`,          '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/beste-brawler-2026`, en:`${BASE}/en/best-brawlers-2026`, fr:`${BASE}/fr/best-brawlers-2026`, es:`${BASE}/es/best-brawlers-2026`, it:`${BASE}/it/best-brawlers-2026` })),
  staticUrl(`${BASE}/it/best-brawlers-2026`,          '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/beste-brawler-2026`, en:`${BASE}/en/best-brawlers-2026`, fr:`${BASE}/fr/best-brawlers-2026`, es:`${BASE}/es/best-brawlers-2026`, it:`${BASE}/it/best-brawlers-2026` })),

  staticUrl(`${BASE}/de/beste-brawler-fuer-anfaenger`, '2026-03-11', 'monthly', '0.8', altLinks({ de:`${BASE}/de/beste-brawler-fuer-anfaenger`, en:`${BASE}/en/best-brawlers-for-beginners`, fr:`${BASE}/fr/best-brawlers-for-beginners`, es:`${BASE}/es/best-brawlers-for-beginners`, it:`${BASE}/it/best-brawlers-for-beginners` })),
  staticUrl(`${BASE}/en/best-brawlers-for-beginners`,  '2026-03-11', 'monthly', '0.8', altLinks({ de:`${BASE}/de/beste-brawler-fuer-anfaenger`, en:`${BASE}/en/best-brawlers-for-beginners`, fr:`${BASE}/fr/best-brawlers-for-beginners`, es:`${BASE}/es/best-brawlers-for-beginners`, it:`${BASE}/it/best-brawlers-for-beginners` })),
  staticUrl(`${BASE}/fr/best-brawlers-for-beginners`,  '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/beste-brawler-fuer-anfaenger`, en:`${BASE}/en/best-brawlers-for-beginners`, fr:`${BASE}/fr/best-brawlers-for-beginners`, es:`${BASE}/es/best-brawlers-for-beginners`, it:`${BASE}/it/best-brawlers-for-beginners` })),
  staticUrl(`${BASE}/es/best-brawlers-for-beginners`,  '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/beste-brawler-fuer-anfaenger`, en:`${BASE}/en/best-brawlers-for-beginners`, fr:`${BASE}/fr/best-brawlers-for-beginners`, es:`${BASE}/es/best-brawlers-for-beginners`, it:`${BASE}/it/best-brawlers-for-beginners` })),
  staticUrl(`${BASE}/it/best-brawlers-for-beginners`,  '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/beste-brawler-fuer-anfaenger`, en:`${BASE}/en/best-brawlers-for-beginners`, fr:`${BASE}/fr/best-brawlers-for-beginners`, es:`${BASE}/es/best-brawlers-for-beginners`, it:`${BASE}/it/best-brawlers-for-beginners` })),

  staticUrl(`${BASE}/de/brawl-stars-trivia-tipps`, '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/brawl-stars-trivia-tipps`, en:`${BASE}/en/brawl-stars-trivia-tips`, fr:`${BASE}/fr/brawl-stars-trivia-tips`, es:`${BASE}/es/brawl-stars-trivia-tips`, it:`${BASE}/it/brawl-stars-trivia-tips` })),
  staticUrl(`${BASE}/en/brawl-stars-trivia-tips`,  '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/brawl-stars-trivia-tipps`, en:`${BASE}/en/brawl-stars-trivia-tips`, fr:`${BASE}/fr/brawl-stars-trivia-tips`, es:`${BASE}/es/brawl-stars-trivia-tips`, it:`${BASE}/it/brawl-stars-trivia-tips` })),
  staticUrl(`${BASE}/fr/brawl-stars-trivia-tips`,  '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/brawl-stars-trivia-tipps`, en:`${BASE}/en/brawl-stars-trivia-tips`, fr:`${BASE}/fr/brawl-stars-trivia-tips`, es:`${BASE}/es/brawl-stars-trivia-tips`, it:`${BASE}/it/brawl-stars-trivia-tips` })),
  staticUrl(`${BASE}/es/brawl-stars-trivia-tips`,  '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/brawl-stars-trivia-tipps`, en:`${BASE}/en/brawl-stars-trivia-tips`, fr:`${BASE}/fr/brawl-stars-trivia-tips`, es:`${BASE}/es/brawl-stars-trivia-tips`, it:`${BASE}/it/brawl-stars-trivia-tips` })),
  staticUrl(`${BASE}/it/brawl-stars-trivia-tips`,  '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/brawl-stars-trivia-tipps`, en:`${BASE}/en/brawl-stars-trivia-tips`, fr:`${BASE}/fr/brawl-stars-trivia-tips`, es:`${BASE}/es/brawl-stars-trivia-tips`, it:`${BASE}/it/brawl-stars-trivia-tips` })),

  // Same slug across all langs
  sameSlug('brawl-stars-update', '0.8'),
  sameSlug('new-brawler-2026',   '0.8'),
  sameSlug('classic-mode-guide', '0.7'),
  sameSlug('pixel-mode-guide',   '0.7'),
  sameSlug('emoji-mode-guide',   '0.7'),
  sameSlug('description-mode-guide', '0.7'),

  staticUrl(`${BASE}/de/neuer-brawler-2026`, '2026-03-11', 'monthly', '0.8', altLinks({ de:`${BASE}/de/neuer-brawler-2026`, en:`${BASE}/en/new-brawler-2026`, fr:`${BASE}/fr/new-brawler-2026`, es:`${BASE}/es/new-brawler-2026`, it:`${BASE}/it/new-brawler-2026` })),

  // Strategies
  staticUrl(`${BASE}/de/strategien/`, '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/strategien/`, en:`${BASE}/en/strategies/`, fr:`${BASE}/fr/strategies/`, es:`${BASE}/es/estrategias/`, it:`${BASE}/it/strategie/` })),
  staticUrl(`${BASE}/en/strategies/`, '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/strategien/`, en:`${BASE}/en/strategies/`, fr:`${BASE}/fr/strategies/`, es:`${BASE}/es/estrategias/`, it:`${BASE}/it/strategie/` })),
  staticUrl(`${BASE}/fr/strategies/`, '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/strategien/`, en:`${BASE}/en/strategies/`, fr:`${BASE}/fr/strategies/`, es:`${BASE}/es/estrategias/`, it:`${BASE}/it/strategie/` })),
  staticUrl(`${BASE}/es/estrategias/`,'2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/strategien/`, en:`${BASE}/en/strategies/`, fr:`${BASE}/fr/strategies/`, es:`${BASE}/es/estrategias/`, it:`${BASE}/it/strategie/` })),
  staticUrl(`${BASE}/it/strategie/`,  '2026-03-11', 'monthly', '0.7', altLinks({ de:`${BASE}/de/strategien/`, en:`${BASE}/en/strategies/`, fr:`${BASE}/fr/strategies/`, es:`${BASE}/es/estrategias/`, it:`${BASE}/it/strategie/` })),

  // Legal
  staticUrl(`${BASE}/impressum.html`,   '2026-02-25', 'yearly', '0.2'),
  staticUrl(`${BASE}/datenschutz.html`, '2026-02-25', 'yearly', '0.2'),
].join('\n');

export async function onRequestGet() {
  let posts = [];
  try {
    const res = await fetch(`${API}/api/blog/published?site_id=${SITE_ID}`);
    if (res.ok) posts = await res.json();
  } catch(_) {}

  const groups = {};
  const solo   = [];
  for (const p of posts) {
    if (p.group_id && p.group_id.trim()) {
      if (!groups[p.group_id]) groups[p.group_id] = [];
      groups[p.group_id].push(p);
    } else {
      solo.push(p);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  function postUrl(p, siblings) {
    const hreflang = siblings.map(s =>
      `    <xhtml:link rel="alternate" hreflang="${s.lang}" href="${BASE}/blog/${s.lang}/${s.slug}"/>`
    ).join('\n');
    const enSib = siblings.find(s => s.lang === 'en');
    const xd = enSib
      ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/blog/en/${enSib.slug}"/>`
      : '';
    return `  <url>
    <loc>${BASE}/blog/${p.lang}/${p.slug}</loc>
    <lastmod>${(p.published_at || p.created_at || today).slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
${hreflang}
${xd}
  </url>`;
  }

  const blogUrls = [
    ...Object.values(groups).flatMap(siblings => siblings.map(p => postUrl(p, siblings))),
    ...solo.map(p => postUrl(p, [p])),
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${STATIC_ENTRIES}
${blogUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
