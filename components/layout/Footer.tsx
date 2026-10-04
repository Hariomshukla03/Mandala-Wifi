import Image from '@/components/shared/Image';
import Link from '@/components/shared/Link';
import {ArrowUpRight} from 'lucide-react';
import {ZifiFiberLine} from '@/components/brand/ZifiFiberLine';
import {businessAddress,businessMapsUrl,contactEmail,contactPhoneDial,contactPhoneDisplay} from '@/data/terms';

export function Footer(){
  return <footer className="relative overflow-hidden border-t border-blue-200 bg-gradient-to-br from-[#e5f1ff] via-[#d9eaff] to-[#cce2ff] pt-20 text-blue-950 dark:border-white/10 dark:from-[#0a1c36] dark:via-[#0b2343] dark:to-[#102e52] dark:text-white">
    <div className="container-x">
      <ZifiFiberLine className="mb-10 opacity-70"/>
      <div className="grid gap-12 border-b border-slate-300/60 pb-16 md:grid-cols-2 lg:grid-cols-4 dark:border-white/10">
        <div>
          <Link href="/" aria-label="Mandala Broadband home" className="focus-ring inline-flex w-56 flex-col items-center text-center">
            <span className="relative h-[110px] w-[180px] overflow-hidden">
              <Image src="/images/mandala-logo-transparent.png" alt="Mandala Broadband logo" width={1314} height={1197} className="absolute left-0 top-0 h-auto w-[180px] max-w-none invert dark:invert-0"/>
            </span>
            <strong className="mt-1 block text-[34px] font-bold leading-tight tracking-[.02em]" style={{fontFamily:'Georgia, serif'}}>Mandal’s</strong>
            <span aria-hidden="true" className="mb-1.5 mt-3 h-px w-full bg-blue-950/35 dark:bg-white/40"/>
            <span className="text-[12px] font-extrabold uppercase tracking-[.025em] text-[#d99a00] dark:text-[#f4c542]">The Trust of Customer</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600 dark:text-slate-400">Fast. Reliable. Connected. Built for the way Surat lives and works.</p>
        </div>
        <FooterGroup title="Explore" links={[["Plans","/plans"],["Services","/services"],["Coverage","/coverage"],["Business","/business-broadband"]]}/>
        <FooterGroup title="Company" links={[["About","/about"],["FAQ","/faq"],["Contact","/contact"]]}/>
        <div>
          <p className="text-sm font-bold">Connect</p>
          <a className="mt-2 block text-sm text-slate-600 hover:text-blue-700 dark:text-slate-400 dark:hover:text-white" href={`tel:${contactPhoneDial}`}>{contactPhoneDisplay}</a>
          <a className="mt-2 block break-all text-sm text-slate-600 hover:text-blue-700 dark:text-slate-400 dark:hover:text-white" href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <address className="mt-4 text-sm not-italic leading-6 text-slate-600 dark:text-slate-400">{businessAddress}</address>
          <a href={businessMapsUrl} target="_blank" rel="noopener noreferrer" className="focus-ring mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900 dark:text-sky-300 dark:hover:text-white">View on Google Maps <ArrowUpRight size={15}/></a>
          <p className="mt-4 text-xs leading-6 text-slate-500">Confirm plan pricing with us before making any payment.</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mandala Broadband. All rights reserved.</p>
        <div className="flex gap-5"><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-service">Terms</Link></div>
      </div>
    </div>
  </footer>;
}

function FooterGroup({title,links}:{title:string;links:string[][]}){
  return <div>
    <p className="text-sm font-bold">{title}</p>
    <div className="mt-4 flex flex-col gap-3">{links.map(([name,href])=><Link className="text-sm text-slate-600 hover:text-blue-700 dark:text-slate-400 dark:hover:text-white" key={href} href={href}>{name}</Link>)}</div>
  </div>;
}
