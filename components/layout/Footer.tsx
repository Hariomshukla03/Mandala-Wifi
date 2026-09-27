import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {ZifiFiberLine} from '@/components/brand/ZifiFiberLine';
import {businessAddress,businessMapsUrl,contactEmail,contactPhoneDial,contactPhoneDisplay} from '@/data/terms';

export function Footer(){
  return <footer className="relative overflow-hidden bg-night pt-20 text-white">
    <div className="container-x">
      <ZifiFiberLine className="mb-10 opacity-70"/>
      <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/images/mandala-logo-transparent.png" alt="Mandala Broadband — The Trust of Customer" width={1314} height={1197} className="h-auto w-48 object-contain"/>
          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">Fast. Reliable. Connected. Built for the way Surat lives and works.</p>
        </div>
        <FooterGroup title="Explore" links={[["Plans","/plans"],["Services","/services"],["Coverage","/coverage"],["Business","/business-broadband"]]}/>
        <FooterGroup title="Company" links={[["About","/about"],["FAQ","/faq"],["Contact","/contact"]]}/>
        <div>
          <p className="text-sm font-bold">Connect</p>
          <a className="mt-2 block text-sm text-slate-400 hover:text-white" href={`tel:${contactPhoneDial}`}>{contactPhoneDisplay}</a>
          <a className="mt-2 block break-all text-sm text-slate-400 hover:text-white" href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <address className="mt-4 text-sm not-italic leading-6 text-slate-400">{businessAddress}</address>
          <a href={businessMapsUrl} target="_blank" rel="noopener noreferrer" className="focus-ring mt-2 inline-flex items-center gap-1 text-sm font-semibold text-sky-300 hover:text-white">View on Google Maps <ArrowUpRight size={15}/></a>
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
    <div className="mt-4 flex flex-col gap-3">{links.map(([name,href])=><Link className="text-sm text-slate-400 hover:text-white" key={href} href={href}>{name}</Link>)}</div>
  </div>;
}
