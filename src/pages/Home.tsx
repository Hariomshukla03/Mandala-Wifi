import {ArrowUpRight,Building2,Headphones,House,PhoneCall,Radio} from 'lucide-react';
import {Hero} from '@/components/home/Hero';
import {SupportOrbit} from '@/components/home/SupportOrbit';
import {SectionHeading} from '@/components/shared/SectionHeading';
import {EnquiryForm} from '@/components/forms/EnquiryForm';
import {PricingGrid} from '@/components/shared/PricingGrid';
import {NetworkGlobe} from '@/components/home/NetworkGlobe';
import {NetworkDots} from '@/components/brand/NetworkDots';
import {SocialProof} from '@/components/home/SocialProof';
import {LocalReach} from '@/components/home/LocalReach';
import {pageMetadata,site} from '@/lib/site';
import {businessAddress,contactEmail,contactPhoneDial,contactPhoneDisplay} from '@/data/terms';

export const metadata=pageMetadata('Fiber Internet in Surat','Fast, reliable fiber broadband for modern homes and businesses in Surat. Explore Mandala Broadband plans and check local availability.');
const services=[[House,'Home Broadband','Smooth everyday internet designed around your household.'],[Radio,'Fiber Internet','Low-latency fiber with room for everything you do online.'],[Building2,'Business Broadband','Connectivity that can grow with your operation.'],[Headphones,'Dedicated Support','Clear assistance across setup, billing and connectivity.']];

export default function Home(){const schema={"@context":"https://schema.org","@type":["LocalBusiness","InternetServiceProvider"],name:'Mandala Broadband',url:site.url,areaServed:{"@type":"City",name:'Surat'},email:contactEmail,telephone:'9898955323',address:{"@type":"PostalAddress",streetAddress:businessAddress,addressLocality:'Surat',postalCode:'395023',addressRegion:'Gujarat',addressCountry:'IN'}};return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <Hero/>
  <LocalReach/>
  <section className="section bg-gradient-to-b from-[#e0efff] via-[#d6e9ff] to-[#edf6ff] dark:from-blue-950/35 dark:via-panel dark:to-panel"><div className="container-x"><SectionHeading eyebrow="Why Mandala Broadband" title="Internet engineered around real life." copy="A modern connectivity experience with the performance, support and simplicity you expect."/><NetworkGlobe/></div></section>
  <section className="section bg-[#edf5ff] dark:bg-night"><div className="container-x"><SectionHeading eyebrow="Plans" title="A faster plan for every kind of connected life." copy="Straightforward speeds. Thoughtful support. No confusing plan names."/><div className="mt-12"><PricingGrid showAudience={false}/></div></div></section>
  <section className="bg-gradient-to-r from-[#0a2b67] via-[#0e4a9b] to-[#1168bd] py-12 text-white"><div className="container-x flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-sky-200">Need a hand choosing?</p><h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">Call us for more details.</h2><p className="mt-2 text-sm text-blue-100">Speak with Mandala Broadband about plans and service in your area.</p></div><a href={`tel:${contactPhoneDial}`} className="focus-ring inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-extrabold text-blue-950 shadow-[0_12px_30px_rgba(0,18,65,.22)] transition hover:-translate-y-0.5 hover:bg-blue-50"><PhoneCall size={19}/>{contactPhoneDisplay}</a></div></section>
  <section className="section bg-[#e4f0ff] dark:bg-panel"><div className="container-x"><SectionHeading eyebrow="Services" title="One network. More ways to connect."/><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(([Icon,t,c])=><a href="/services" key={t as string} className="group card relative overflow-hidden p-7"><div className="absolute inset-0 grid-fade opacity-0 transition group-hover:opacity-100"/><Icon className="relative text-brand"/><h3 className="relative mt-16 text-h3">{t as string}</h3><p className="relative muted mt-3 text-sm leading-6">{c as string}</p><ArrowUpRight className="relative mt-6 text-brand transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></a>)}</div></div></section>
  <SocialProof/>
  <section className="section overflow-hidden"><div className="container-x grid items-center gap-10 lg:grid-cols-2"><SupportOrbit/><div><p className="text-[clamp(5rem,16vw,11rem)] font-extrabold leading-none text-brand">24/7</p><h2 className="mt-2 text-h2">We’re here when you need us.</h2><p className="muted mt-5 text-lg">Support · Assistance · Connectivity</p></div></div></section>
  <section className="section relative overflow-hidden bg-ink text-white"><NetworkDots className="opacity-40"/><div className="container-x relative"><SectionHeading eyebrow="Enquire now" title="Ready for a better connection?" copy="Tell us what you need and where you are. The Mandala Broadband team will help with the next step."/><div className="mt-10 text-ink dark:text-white"><EnquiryForm/></div></div></section>
</>}
