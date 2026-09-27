import {Headphones,Mail,MapPin,Phone} from 'lucide-react';
import {PageHero} from '@/components/shared/PageHero';
import {EnquiryForm} from '@/components/forms/EnquiryForm';
import {SectionHeading} from '@/components/shared/SectionHeading';
import {pageMetadata} from '@/lib/site';
import {businessAddress,contactEmail,contactPhoneDial,contactPhoneDisplay} from '@/data/terms';

export const metadata=pageMetadata('Contact Mandala Broadband','Contact Mandala Broadband for home internet, business broadband, coverage and support enquiries.','/contact');

export default function Contact(){
  return <>
    <PageHero eyebrow="Contact" title="Let’s get you connected." copy="Ask about coverage, plans, business broadband or support. We’ll point you in the right direction."/>
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <SectionHeading eyebrow="Get in touch" title="A direct line to Mandala Broadband."/>
          <div className="mt-8 space-y-4">
            <a href={`mailto:${contactEmail}`} className="card flex items-center gap-4 p-5"><Mail className="text-brand"/><span>{contactEmail}</span></a>
            <a href={`tel:${contactPhoneDial}`} className="card flex items-center gap-4 p-5"><Phone className="text-brand"/><span>{contactPhoneDisplay}</span></a>
            <div className="card flex items-start gap-4 p-5"><MapPin className="mt-0.5 shrink-0 text-brand"/><address className="not-italic leading-6">{businessAddress}</address></div>
            <div className="card flex items-center gap-4 p-5"><Headphones className="text-brand"/><span>24/7 support</span></div>
          </div>
        </div>
        <EnquiryForm/>
      </div>
    </section>
  </>;
}
