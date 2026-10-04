import 'dotenv/config';
import {config} from 'dotenv';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';

config({path:['.env.local','.env'],override:false,quiet:true});
const production=process.argv.includes('--production');
const port=Number(production?process.env.PORT||3000:process.env.API_PORT||3002);
const dist=resolve('dist');
const types:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.xml':'application/xml','.txt':'text/plain','.webmanifest':'application/manifest+json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.mp4':'video/mp4','.ico':'image/x-icon','.woff2':'font/woff2'};

const server=createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  try{
    const path=new URL(req.url||'/','http://localhost').pathname;
    if(path==='/api/health'){
      res.setHeader('Content-Type','application/json');res.end(JSON.stringify({ok:true,frontend:'react-vite'}));return;
    }
    if(path.startsWith('/api/')){res.writeHead(404,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'API route not found.'}));return;}
    if(!production){res.writeHead(404);res.end('Use the Vite frontend on http://localhost:3000.');return;}
    if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
    const decoded=decodeURIComponent(path);
    let file=resolve(dist,'.'+decoded);
    if(file!==dist&&!file.startsWith(dist+sep)){res.writeHead(403);res.end();return;}
    let status=200;
    try{if((await stat(file)).isDirectory())file=resolve(file,'index.html');await stat(file)}
    catch{
      if(extname(decoded)){res.writeHead(404);res.end('Not found');return;}
      file=resolve(dist,'404.html');status=404;
    }
    const contents=await readFile(file);
    res.writeHead(status,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':file.includes(`${sep}assets${sep}`)?'public, max-age=31536000, immutable':'no-cache'});
    res.end(req.method==='HEAD'?undefined:contents);
  }catch(error){console.error('Request failed:',error instanceof Error?error.message:'Unknown error');if(!res.headersSent){res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Unable to process this request.'}))}else res.end();}
});
server.listen(port,process.env.HOST||(production?'0.0.0.0':'127.0.0.1'),()=>console.log(`Mandala static website: http://localhost:${port}`));
const shutdown=()=>server.close(()=>process.exit(0));
process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
