import {ArrowUpRight,BadgeCheck,Headphones,MapPin,UsersRound} from 'lucide-react';
import {coverageAreas} from '@/data/coverage';
import {contactPhoneDial} from '@/data/terms';

const highlights = [
  {icon:UsersRound,value:'2,500+',label:'customers connected',detail:'A growing community across Surat.'},
  {icon:Headphones,value:'24/7',label:'support',detail:'Help when you need a hand.'},
  {icon:BadgeCheck,value:'90%+',label:'success rate',detail:'A result we keep working to improve.'},
];

export function LocalReach(){return <section className="section bg-[#e9f3ff] dark:bg-night" aria-labelledby="local-reach-heading">
  <div className="container-x">
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map(({icon:Icon,value,label,detail})=><article key={label} className="group rounded-[1.75rem] border border-blue-200 bg-white p-7 shadow-[0_14px_35px_rgba(19,77,156,.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-[0_22px_45px_rgba(19,77,156,.14)] dark:border-white/10 dark:bg-[#0b1b35] dark:hover:border-sky-400/50 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-sky-300"><Icon size={23} strokeWidth={1.8}/></span>
        <p className="mt-7 font-[family-name:var(--font-space-grotesk)] text-[clamp(2.75rem,5vw,4rem)] font-bold leading-none tracking-[-.06em] text-blue-950 dark:text-white">{value}</p>
        <h3 className="mt-3 text-lg font-bold text-blue-900 dark:text-sky-200">{label}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p>
      </article>)}
    </div>

    <div className="mt-8 overflow-hidden rounded-[2rem] border border-blue-200 bg-gradient-to-br from-white via-[#f8fbff] to-[#dcecff] p-7 shadow-[0_18px_45px_rgba(19,77,156,.07)] dark:border-white/10 dark:from-[#102b56] dark:via-[#0b1f40] dark:to-[#08172e] sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div><span className="eyebrow">Our coverage</span><h2 id="local-reach-heading" className="mt-4 text-h2">Closer to your corner of Surat.</h2><p className="muted mt-4 max-w-2xl leading-7">Explore the neighbourhoods we serve. Call us to confirm availability at your exact address.</p></div>
        <a href={`tel:${contactPhoneDial}`} className="focus-ring inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 lg:self-auto">Check your address <ArrowUpRight size={17}/></a>
      </div>
      <ul className="mt-8 flex flex-wrap gap-3" aria-label="Mandala Broadband coverage areas">
        {coverageAreas.map(area=><li key={area} className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-950 shadow-sm dark:border-white/15 dark:bg-white/10 dark:text-white"><MapPin size={15} className="text-blue-600 dark:text-sky-300"/>{area}</li>)}
      </ul>
    </div>
  </div>
</section>}
