import {ArrowUpRight,MapPin} from 'lucide-react';
import {businessAddress,businessMapEmbedUrl,businessMapsUrl} from '@/data/terms';
import {SectionHeading} from '@/components/shared/SectionHeading';

export function BusinessLocation(){
  return <section className="section bg-[#edf5ff] dark:bg-panel">
    <div className="container-x">
      <SectionHeading eyebrow="Visit us" title="Find Mandala Broadband in Surat." copy="Visit our office or open the exact location in Google Maps for directions."/>
      <div className="mt-10 grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="card flex flex-col justify-between p-7 sm:p-9">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-brand dark:bg-blue-500/15"><MapPin size={24}/></div>
            <h3 className="mt-7 text-h3">Mandala Broadband</h3>
            <address className="muted mt-4 not-italic leading-7">{businessAddress}</address>
          </div>
          <a href={businessMapsUrl} target="_blank" rel="noopener noreferrer" className="focus-ring mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">Open in Google Maps <ArrowUpRight size={17}/></a>
        </div>
        <div className="overflow-hidden rounded-3xl border border-blue-200 bg-blue-100 shadow-[0_18px_45px_rgba(24,80,160,.12)] dark:border-white/10 dark:bg-night">
          <iframe title="Map showing Mandala Broadband office location" src={businessMapEmbedUrl} className="h-[360px] w-full border-0 sm:h-[410px]" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
        </div>
      </div>
    </div>
  </section>;
}
