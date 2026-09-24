'use client';

import {motion,useReducedMotion} from 'framer-motion';

const orbitDots=[
  {angle:18,radius:124,size:5,delay:0},
  {angle:102,radius:150,size:4,delay:.5},
  {angle:192,radius:126,size:4,delay:1.1},
  {angle:278,radius:150,size:6,delay:1.6},
];

export function SupportOrbit(){const reduced=useReducedMotion();return <div className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle,rgba(23,105,255,.13),transparent_64%)]">
  <motion.div aria-hidden="true" className="absolute h-[88%] w-[88%] rounded-full border border-brand/25" animate={reduced?undefined:{rotate:360}} transition={{duration:34,repeat:Infinity,ease:'linear'}}/>
  <motion.div aria-hidden="true" className="absolute h-[70%] w-[70%] rounded-full border border-brand-cyan/25 border-dashed" animate={reduced?undefined:{rotate:-360}} transition={{duration:24,repeat:Infinity,ease:'linear'}}/>
  {[0,1,2].map(i=><motion.span key={i} aria-hidden="true" className="absolute h-[38%] w-[38%] rounded-full border border-brand-cyan/30" initial={{scale:.7,opacity:0}} animate={reduced?{scale:1,opacity:.25}:{scale:[.65,1.65],opacity:[.55,0]}} transition={{duration:3.4,delay:i*1.05,repeat:Infinity,ease:'easeOut'}}/>)}
  <motion.div aria-hidden="true" className="absolute left-1/2 top-1/2 h-px w-[44%] origin-left bg-gradient-to-r from-brand-cyan/80 to-transparent" animate={reduced?undefined:{rotate:360}} transition={{duration:5.5,repeat:Infinity,ease:'linear'}}/>
  <svg viewBox="0 0 200 200" className="relative z-10 h-32 w-32 overflow-visible" aria-label="Animated Mandala Broadband support shield">
    <defs><filter id="support-glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="support-blue" x1="0" x2="1"><stop stopColor="#35C8FF"/><stop offset="1" stopColor="#1769FF"/></linearGradient></defs>
    <motion.path d="M100 28c18 14 34 18 48 20v43c0 42-20 66-48 79-28-13-48-37-48-79V48c14-2 30-6 48-20Z" fill="rgba(23,105,255,.08)" stroke="url(#support-blue)" strokeWidth="8" strokeLinejoin="round" filter="url(#support-glow)" initial={{pathLength:0,opacity:0}} whileInView={{pathLength:1,opacity:1}} viewport={{once:true,amount:.5}} transition={{duration:1.25,ease:'easeOut'}}/>
    <motion.path d="m76 98 17 17 34-37" fill="none" stroke="#35C8FF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" initial={{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true,amount:.5}} transition={{duration:.65,delay:.85,ease:'easeOut'}}/>
  </svg>
  {orbitDots.map((dot,i)=>{const rad=dot.angle*Math.PI/180;return <motion.span key={i} aria-hidden="true" className="absolute left-1/2 top-1/2 rounded-full bg-brand-cyan shadow-[0_0_18px_#35C8FF]" style={{width:dot.size,height:dot.size,marginLeft:-dot.size/2,marginTop:-dot.size/2,x:Math.cos(rad)*dot.radius,y:Math.sin(rad)*dot.radius}} animate={reduced?undefined:{scale:[1,1.9,1],opacity:[.3,1,.3]}} transition={{duration:2.5,delay:dot.delay,repeat:Infinity,ease:'easeInOut'}}/>})}
  <div aria-hidden="true" className="absolute inset-[8%] rounded-full shadow-[inset_0_0_60px_rgba(23,105,255,.08)]"/>
</div>}
