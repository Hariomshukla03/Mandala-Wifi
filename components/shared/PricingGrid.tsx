'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import {Check} from 'lucide-react';
import {plans} from '@/data/plans';
import {Button} from './Button';

type HomeBilling = '6 months' | '12 months';
type BusinessBilling = 'monthly' | 'yearly';

export function PricingGrid({showAudience=true,defaultAudience='home'}:{showAudience?:boolean;defaultAudience?:'home'|'business'}) {
  const [homeBilling,setHomeBilling] = useState<HomeBilling>('12 months');
  const [businessBilling,setBusinessBilling] = useState<BusinessBilling>('monthly');
  const [audience,setAudience] = useState<'home'|'business'>(defaultAudience);
  const visible = plans.filter(plan => plan.audience === audience);

  return <div>
    <div className="mb-10 flex flex-wrap items-center gap-3">
      {showAudience && <Toggle values={['home','business']} active={audience} set={value=>setAudience(value as typeof audience)}/>}
      {audience === 'home'
        ? <Toggle values={['6 months','12 months']} active={homeBilling} set={value=>setHomeBilling(value as HomeBilling)}/>
        : <Toggle values={['monthly','yearly']} active={businessBilling} set={value=>setBusinessBilling(value as BusinessBilling)}/>
      }
      {audience === 'home' && <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">Unlimited plans</span>}
    </div>
    <div className={'grid gap-5 '+(visible.length===4?'lg:grid-cols-4':'md:grid-cols-2')}>
      {visible.map((plan,index)=>{
        const homePrice = homeBilling === '6 months' ? plan.sixMonths : plan.twelveMonths;
        const businessPrice = businessBilling === 'monthly' ? plan.monthly : plan.yearly;
        const price = audience === 'home' ? homePrice : businessPrice;
        return <motion.article id={plan.id} layout key={plan.id} className={'card relative flex scroll-mt-28 flex-col p-6 '+(plan.popular?'border-brand shadow-glow':'')} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.06}}>
          {plan.popular && <span className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold tracking-wider text-white">MOST POPULAR</span>}
          <p className="font-bold">{plan.name}</p>
          <div className="mt-6"><span className="text-4xl font-extrabold">{plan.speed}</span><span className="muted ml-2">Mbps</span></div>
          <p className="muted mt-4 min-h-14 text-sm">{plan.description}</p>
          <div className="mt-6 min-h-10">
            {price == null
              ? <span className="text-lg font-extrabold text-slate-400">Not available</span>
              : <><motion.span key={`${audience}-${homeBilling}-${businessBilling}-${plan.id}`} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className="text-2xl font-extrabold">₹{price.toLocaleString('en-IN')}</motion.span><span className="muted text-sm"> / {audience === 'home' ? homeBilling : businessBilling === 'monthly' ? 'month' : 'year'}</span></>
            }
          </div>
          <ul className="my-7 space-y-3 border-t border-slate-200 pt-6 text-sm dark:border-white/10">{plan.features.map(feature=><li key={feature} className="flex gap-2"><Check size={17} className="shrink-0 text-brand"/>{feature}</li>)}</ul>
          <Button href={`/contact?plan=${plan.id}`} className={`mt-auto ${price == null?'pointer-events-none opacity-45':''}`}>{price == null ? 'Choose another duration' : `Choose ${plan.name}`}</Button>
        </motion.article>;
      })}
    </div>
    <p className="muted mt-5 text-xs">GST, connection, equipment and optional static IP charges are additional. See the terms below for full details.</p>
  </div>;
}

function Toggle({values,active,set}:{values:string[];active:string;set:(value:string)=>void}) {
  return <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-panel">{values.map(value=><button type="button" key={value} onClick={()=>set(value)} className={'rounded-full px-5 py-2 text-sm font-bold capitalize transition '+(active===value?'bg-brand text-white':'muted hover:text-brand')}>{value}</button>)}</div>;
}
