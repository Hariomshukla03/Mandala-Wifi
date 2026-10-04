import {PageHero} from '@/components/shared/PageHero';
import {EnquiryForm} from '@/components/forms/EnquiryForm';
import {SectionHeading} from '@/components/shared/SectionHeading';
import {LocalReach} from '@/components/home/LocalReach';
import {pageMetadata} from '@/lib/site';

export const metadata=pageMetadata('Coverage in Surat','Explore Mandala Broadband coverage areas and request service in your locality.','/coverage');

export default function Coverage(){return <>
  <PageHero eyebrow="Coverage" title="Local internet, closer to home." copy="See the Surat areas we serve and ask our team about availability at your address."/>
  <LocalReach/>
  <section className="section"><div className="container-x"><SectionHeading eyebrow="Request Mandala Broadband" title="Tell us where you need a better connection." copy="Share your address and our team will help confirm the next step."/><div className="mt-10"><EnquiryForm/></div></div></section>
</>}
