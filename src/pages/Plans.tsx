import {PageHero} from '@/components/shared/PageHero';
import {PricingGrid} from '@/components/shared/PricingGrid';
import {FaqAccordion} from '@/components/shared/FaqAccordion';
import {SectionHeading} from '@/components/shared/SectionHeading';
import {plans} from '@/data/plans';
import {planTerms,salesVerificationNotice} from '@/data/terms';
import {pageMetadata,site} from '@/lib/site';

export const metadata=pageMetadata('Broadband Plans','Compare Mandala Broadband 50, 75 and 100 Mbps unlimited plans across 12, 18 and 24-month durations.','/plans');

export default function Plans(){
  const schema={"@context":"https://schema.org","@graph":plans.map(plan=>({"@type":"Product",name:`Mandala Broadband ${plan.name}`,description:plan.description,brand:{"@type":"Brand",name:'Mandala Broadband'},offers:{"@type":"Offer",price:plan.twelveMonths,priceCurrency:'INR',url:`${site.url}/plans#${plan.id}`,availability:'https://schema.org/InStock'}}))};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <PageHero eyebrow="Unlimited plans" title="Clear plans. Serious speed." copy="Choose a 12, 18 or 24-month unlimited plan built for homes and businesses across Surat."/>
    <section className="section"><div className="container-x"><PricingGrid/></div></section>
    <section className="section bg-white dark:bg-panel"><div className="container-x"><SectionHeading eyebrow="Plan terms" title="Everything you should know before you subscribe."/><div className="mt-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><aside className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-7"><p className="text-sm font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-300">Verify before you pay</p><p className="mt-4 leading-7 text-slate-700 dark:text-slate-200">{salesVerificationNotice}</p></aside><ol className="grid gap-3 sm:grid-cols-2">{planTerms.map((term,index)=><li key={term} className="card flex gap-4 p-5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-extrabold text-brand">{index+1}</span><p className="muted text-sm leading-6">{term}</p></li>)}</ol></div></div></section>
    <section className="section bg-white dark:bg-panel"><div className="container-x"><SectionHeading eyebrow="Questions" title="Plan essentials."/><div className="mt-8"><FaqAccordion limit={4}/></div></div></section>
  </>;
}
