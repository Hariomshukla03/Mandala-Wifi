import Image from '@/components/shared/Image';
import {useState} from 'react';
import {ArrowUpRight,MapPin,Star,Wifi} from 'lucide-react';
import {businessAddress,businessMapEmbedUrl,businessMapsUrl} from '@/data/terms';

const clients = [
  'Bio Fics Pvt Ltd','Ridhi Sidhi Mill','Paras Mill','Paras Print',
  'Chinco Mill','New Bharat Mill','Metha HP Petrol Pump','Blue Dart',
  'Swiggy Instamart','Zepto','Messho','Keystone Concrete',
  'Rmix Concrete','Palloumi Builder','Swagat Builder',
];

export function SocialProof(){const[paused,setPaused]=useState(false);return <section className="section overflow-hidden bg-[#eaf3ff] dark:bg-panel" aria-labelledby="clients-heading">
  <div className="container-x">
    <div id="reviews-map" className="grid scroll-mt-28 gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="flex flex-col justify-between rounded-[2rem] border border-blue-200 bg-white p-7 shadow-[0_20px_60px_rgba(12,64,150,.08)] sm:p-10 dark:border-white/10 dark:bg-[#0b1b35]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-blue-700 dark:text-brand-cyan">What customers say</p>
          <h2 className="mt-4 text-h3 text-blue-950 dark:text-white">Rated by our community on Google</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">See firsthand feedback from people who connect with Mandala Broadband.</p>
        </div>
        <div className="mt-9">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="4.8 out of 5 stars from 51 Google reviews, checked October 2026">
            <span className="text-6xl font-extrabold tracking-tight text-blue-950 dark:text-white">4.8</span>
            <div><div className="flex gap-1 text-amber-500" aria-hidden="true">{Array.from({length:5},(_,i)=><Star key={i} size={21} fill="currentColor" strokeWidth={1.5}/>)}</div><p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">51 Google reviews · October 2026</p></div>
          </div>
          <a href={businessMapsUrl} target="_blank" rel="noopener noreferrer" className="focus-ring mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 transition hover:text-blue-500 dark:text-brand-cyan">Read Google reviews <ArrowUpRight size={16}/></a>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-blue-200 bg-white shadow-[0_20px_60px_rgba(12,64,150,.08)] dark:border-white/10 dark:bg-[#0b1b35]">
        <iframe title="Map showing Mandala Broadband office location" src={businessMapEmbedUrl} className="h-[270px] w-full border-0 sm:h-[315px]" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-blue-600 dark:text-brand-cyan" size={20}/><div><p className="text-sm font-bold text-blue-950 dark:text-white">Visit Mandala Broadband</p><address className="mt-1 text-xs not-italic leading-5 text-slate-600 dark:text-slate-300">{businessAddress}</address></div></div>
          <a href={businessMapsUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex shrink-0 items-center gap-1 text-xs font-bold text-blue-700 dark:text-brand-cyan">Directions <ArrowUpRight size={14}/></a>
        </div>
      </div>
    </div>

    <div className="mt-24 max-w-3xl"><span className="eyebrow">Our clients</span><h2 id="clients-heading" className="mt-5 text-h2">Connected with businesses across Surat.</h2><p className="muted mt-5 text-lg leading-8">Trusted by teams across industries, from mills and logistics to builders and quick commerce.</p></div>
  </div>

  <div className="container-x mt-6"><button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused} className="focus-ring rounded-full border border-blue-200 px-4 py-2 text-xs font-semibold text-blue-800 dark:border-white/20 dark:text-sky-200">{paused?'Play client names':'Pause client names'}</button></div>
  <div className="client-marquees mt-6 space-y-4" data-paused={paused} aria-label="Our clients">
    <ClientMarquee names={clients.slice(0,8)} direction="right"/>
    <ClientMarquee names={clients.slice(8)} direction="left"/>
  </div>

  <div className="container-x mt-16">
    <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><span className="eyebrow">Made for your space</span><h3 className="mt-4 text-h3">Good Wi-Fi feels effortless.</h3></div><p className="muted max-w-md text-sm leading-6">A strong connection belongs wherever you live, work and stay in touch.</p></div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.15fr_.85fr]">
      <PhotoCard src="/images/wifi-router-home.png" alt="White Wi-Fi router on a shelf in a living room" eyebrow="At home" title="Room to connect everything." copy="From everyday browsing to streaming and work."/>
      <PhotoCard src="/images/wifi-router-office.png" alt="Dark Wi-Fi router on an office desk" eyebrow="At work" title="Ready for busy workdays." copy="Connectivity for the devices your team relies on."/>
    </div>
  </div>
</section>}

function ClientMarquee({names,direction}:{names:string[];direction:'left'|'right'}){
  return <div className="client-marquee overflow-hidden" role="list">
    <div className={`client-track flex w-max ${direction==='left'?'client-track-left':'client-track-right'}`}>
      {[0,1].map(copy=><div key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy===1}>
        {names.map(name=><span role={copy===0?'listitem':undefined} key={name} className="whitespace-nowrap rounded-full border border-blue-200 bg-white px-7 py-4 text-sm font-bold text-blue-950 shadow-[0_8px_24px_rgba(18,75,150,.06)] dark:border-white/10 dark:bg-[#0b1b35] dark:text-white">{name}</span>)}
      </div>)}
    </div>
  </div>;
}

function PhotoCard({src,alt,eyebrow,title,copy}:{src:string;alt:string;eyebrow:string;title:string;copy:string}){
  return <figure className="group overflow-hidden rounded-[1.75rem] border border-blue-200 bg-white shadow-[0_16px_40px_rgba(18,75,150,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(18,75,150,.14)] dark:border-white/10 dark:bg-[#0b1b35]">
    <div className="relative h-56 overflow-hidden bg-blue-950 sm:h-64"><Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"/><span className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/85 px-4 py-1.5 text-xs font-bold text-blue-950 backdrop-blur">{eyebrow}</span></div>
    <figcaption className="flex items-center justify-between gap-4 p-6"><div><h4 className="text-lg font-bold text-blue-950 dark:text-white">{title}</h4><p className="muted mt-1 text-sm leading-6">{copy}</p></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-brand/15 dark:text-brand-cyan"><Wifi size={22}/></span></figcaption>
  </figure>;
}
