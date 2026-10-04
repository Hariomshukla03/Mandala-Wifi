import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {paths,render} from '../.prerender/prerender.js';

const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const template=await readFile('dist/index.html','utf8');
for(const path of [...paths,'/404']){
  const {html,metadata:meta}=render(path);
  const image=new URL(meta.openGraph.images[0].url,meta.alternates.canonical).href;
  const metadata=`<link rel="canonical" href="${escape(meta.alternates.canonical)}"/><meta property="og:title" content="${escape(meta.openGraph.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:url" content="${escape(meta.openGraph.url)}"/><meta property="og:type" content="website"/><meta property="og:site_name" content="Mandala Broadband"/><meta property="og:image" content="${escape(image)}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(meta.openGraph.title)}"/><meta name="twitter:description" content="${escape(meta.description)}"/><meta name="twitter:image" content="${escape(image)}"/>`;
  const page=template.replace('<!--app-html-->',html).replace('<!--page-meta-->',metadata).replace(/<title>.*?<\/title>/,`<title>${escape(meta.openGraph.title)}</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${escape(meta.description)}"/>`);
  const directory=path==='/'||path==='/404'?'dist':join('dist',path.slice(1));
  await mkdir(directory,{recursive:true});await writeFile(join(directory,path==='/404'?'404.html':'index.html'),page);
}
const base=new URL(render('/').metadata.alternates.canonical).origin;
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${escape(base+path)}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
console.log(`Generated ${paths.length} React pages, 404 page, sitemap and robots.txt.`);
