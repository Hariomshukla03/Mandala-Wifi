'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import {Check, Gauge} from 'lucide-react';
import {plans,type Plan} from '@/data/plans';
import {Button} from './Button';

type Duration = '12 Months' | '18 Months' | '24 Months';

const durationPrice: Record<Duration,keyof Pick<Plan,'twelveMonths'|'eighteenMonths'|'twentyFourMonths'>> = {
  '12 Months':'twelveMonths',
  '18 Months':'eighteenMonths',
  '24 Months':'twentyFourMonths'
};

export function PricingGrid(_props:{showAudience?:boolean;defaultAudience?:'home'|'business'}={}) {
  const [duration,setDuration] = useState<Duration>('12 Months');
  const priceKey = durationPrice[duration];

  return <div>
    <div className="mb-10 flex flex-wrap items-center gap-3">
      <Toggle values={['12 Months','18 Months','24 Months']} active={duration} set={value=>setDuration(value as Duration)}/>
      <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:border-brand/30 dark:bg-brand/10 dark:text-brand-cyan">Unlimited plans</span>
    </div>
    <div className="grid gap-5 md:grid-cols-3">
      {plans.map((plan,index)=>{
        const price = plan[priceKey];
        return <motion.article id={plan.id} layout key={plan.id} className="card relative flex scroll-mt-28 flex-col overflow-hidden p-7" initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.07}}>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-800 via-brand to-brand-cyan"/>
          <p className="font-extrabold text-blue-900 dark:text-white">{plan.name}</p>
          <div className="mt-6"><span className="text-5xl font-extrabold tracking-tight text-brand">{plan.speed}</span><span className="muted ml-2 font-semibold">Mbps</span></div>
          <p className="muted mt-4 min-h-16 text-sm leading-6">{plan.description}</p>
          <div className="mt-6 rounded-2xl bg-blue-50 p-4 dark:bg-white/5">
            <motion.span key={`${duration}-${plan.id}`} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className="text-3xl font-extrabold text-blue-900 dark:text-white">₹{price.toLocaleString('en-IN')}</motion.span>
            <span className="muted ml-1 text-sm"> / {duration.toLowerCase()}</span>
          </div>
          <ul className="my-7 space-y-3 border-t border-blue-100 pt-6 text-sm dark:border-white/10">{plan.features.map(feature=><li key={feature} className="flex gap-2"><Check size={17} className="shrink-0 text-brand"/>{feature}</li>)}</ul>
          <Button href={`/contact?plan=${plan.id}`} className="mt-auto">Choose {plan.speed} Mbps</Button>
        </motion.article>;
      })}
    </div>
    <div className="mt-6 flex items-center gap-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 p-5 text-blue-950 dark:border-brand/25 dark:from-brand/10 dark:to-brand-cyan/5 dark:text-white"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white"><Gauge size={22}/></span><div><p className="font-extrabold">1000 Mbps plan also available</p><p className="mt-1 text-sm text-blue-700 dark:text-slate-300">Contact our team for pricing and availability.</p></div></div>
    <p className="muted mt-5 text-xs">GST, connection, equipment and optional static IP charges are additional. See the terms below for full details.</p>
  </div>;
}

function Toggle({values,active,set}:{values:string[];active:string;set:(value:string)=>void}) {
  return <div className="inline-flex flex-wrap rounded-full border border-blue-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-panel">{values.map(value=><button type="button" key={value} onClick={()=>set(value)} className={'rounded-full px-5 py-2 text-sm font-extrabold transition '+(active===value?'bg-gradient-to-r from-blue-800 to-brand text-white shadow-md':'text-blue-700 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-white/5')}>{value}</button>)}</div>;
}
