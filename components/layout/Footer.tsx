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
          <Image src="/images/mandala-logo-transparent.png" alt="Mandala Broadband — The Trust of Customer" width={1314} height={1197} className="h-auto w-48 object-contain brightness-0 dark:brightness-100"/>
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
