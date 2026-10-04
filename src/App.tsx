import {useEffect} from 'react';
import {Route,Routes,useLocation} from 'react-router-dom';
import {ThemeProvider} from '@/components/providers/ThemeProvider';
import {Navbar} from '@/components/layout/Navbar';
import {Footer} from '@/components/layout/Footer';
import {Analytics} from '@/components/providers/Analytics';
import {ClientInteractions} from '@/components/providers/ClientInteractions';
import {StickyWhatsApp} from '@/components/shared/StickyWhatsApp';
import {routes,notFound} from './routes';

function PageEffects(){
  const {pathname,hash}=useLocation();
  useEffect(()=>{
    const normalizedPath=pathname.replace(/\/+$/,'')||'/';
    const meta=(routes.find(route=>route.path===normalizedPath)||notFound).metadata;
    document.title=`${meta.title} | Mandala Broadband`;
    const setMeta=(attribute:string,key:string,value:string)=>{
      let node=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if(!node){node=document.createElement('meta');node.setAttribute(attribute,key);document.head.appendChild(node)}
      node.content=value;
    };
    setMeta('name','description',meta.description);
    for(const [key,value] of Object.entries({title:meta.openGraph.title,description:meta.description,url:meta.openGraph.url,type:'website',site_name:'Mandala Broadband',image:meta.openGraph.images[0].url}))setMeta('property',`og:${key}`,key==='image'?new URL(value,meta.alternates.canonical).href:value);
    setMeta('name','twitter:card','summary_large_image');
    setMeta('name','twitter:title',meta.openGraph.title);
    setMeta('name','twitter:description',meta.description);
    setMeta('name','twitter:image',new URL(meta.openGraph.images[0].url,meta.alternates.canonical).href);
    let canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}
    canonical.href=meta.alternates.canonical;
    const frame=requestAnimationFrame(()=>{
      if(hash){try{document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()}catch{}}
      else window.scrollTo({top:0,behavior:'instant'});
    });
    return()=>cancelAnimationFrame(frame);
  },[pathname,hash]);
  return null;
}

export function App(){return <div data-app-shell><ThemeProvider><PageEffects/><ClientInteractions/><Navbar/><main><Routes>{routes.map(({path,Component})=><Route key={path} path={path} element={<Component/>}/>)}<Route path="*" element={<notFound.Component/>}/></Routes></main><Footer/><StickyWhatsApp/><Analytics/></ThemeProvider></div>}
