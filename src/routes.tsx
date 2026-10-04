import Home,{metadata as homeMeta} from './pages/Home';
import About,{metadata as aboutMeta} from './pages/About';
import Services,{metadata as servicesMeta} from './pages/Services';
import Plans,{metadata as plansMeta} from './pages/Plans';
import Coverage,{metadata as coverageMeta} from './pages/Coverage';
import BusinessBroadband,{metadata as businessMeta} from './pages/BusinessBroadband';
import Contact,{metadata as contactMeta} from './pages/Contact';
import Faq,{metadata as faqMeta} from './pages/Faq';
import Privacy,{metadata as privacyMeta} from './pages/Privacy';
import Terms,{metadata as termsMeta} from './pages/Terms';
import NotFound from './pages/NotFound';
import {pageMetadata} from '@/lib/site';

export const routes=[
  {path:'/',Component:Home,metadata:homeMeta},
  {path:'/about',Component:About,metadata:aboutMeta},
  {path:'/services',Component:Services,metadata:servicesMeta},
  {path:'/plans',Component:Plans,metadata:plansMeta},
  {path:'/coverage',Component:Coverage,metadata:coverageMeta},
  {path:'/business-broadband',Component:BusinessBroadband,metadata:businessMeta},
  {path:'/contact',Component:Contact,metadata:contactMeta},
  {path:'/faq',Component:Faq,metadata:faqMeta},
  {path:'/privacy-policy',Component:Privacy,metadata:privacyMeta},
  {path:'/terms-of-service',Component:Terms,metadata:termsMeta},
];
export const notFound={Component:NotFound,metadata:pageMetadata('Page not found','The requested page could not be found.')};
