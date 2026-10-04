import {contactEmail,contactPhoneDisplay} from '@/data/terms';

export type EnquiryValues={name:string;mobile:string;email:string;area:string;pincode:string;service:string;plan:string;message:string;website:string};

const unavailable=`Online enquiries are temporarily unavailable. Please call ${contactPhoneDisplay} or use WhatsApp.`;

export async function sendEnquiry(values:EnquiryValues){
  if(values.website.trim())throw new Error('Unable to send your enquiry. Please refresh the page and try again.');
  const serviceId=import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId=import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey=import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  if(!serviceId||!templateId||!publicKey)throw new Error(unavailable);

  const {default:emailjs}=await import('@emailjs/browser');
  try{
    const result=await emailjs.send(serviceId,templateId,{
      name:values.name.trim(),mobile:values.mobile.trim(),
      email:values.email.trim()||'Not provided',
      reply_to:values.email.trim()||contactEmail,
      area:values.area.trim(),pincode:values.pincode.trim(),
      service:values.service,plan:values.plan||'Not selected',
      message:values.message.trim()||'Not provided',
      submitted_at:new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})+' IST',
    },{publicKey,limitRate:{id:'mandala-enquiry',throttle:1000}});
    if(result.status<200||result.status>=300)throw new Error('Email submission failed.');
  }catch(error){
    const status=typeof error==='object'&&error!==null&&'status' in error?Number(error.status):0;
    if(status===429)throw new Error('Please wait a moment before sending another enquiry.');
    throw new Error(`We could not send your enquiry. Please try again or call ${contactPhoneDisplay}.`);
  }
}
