'use client';

import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useState,type ComponentType} from 'react';
import {CheckCircle2,ChevronDown,Gauge,Hash,Mail,MapPin,MessageSquare,Phone,Send,UserRound,Wifi,type LucideProps} from 'lucide-react';

const schema=Yup.object({
  name:Yup.string().min(2).max(60).required('Full name is required'),
  mobile:Yup.string().matches(/^[6-9]\d{9}$/,'Enter a valid 10-digit Indian mobile number').required('Mobile number is required'),
  email:Yup.string().email('Enter a valid email address'),
  area:Yup.string().min(2).max(80).required('Area is required'),
  pincode:Yup.string().matches(/^\d{6}$/,'Enter exactly 6 digits').required('Pincode is required'),
  service:Yup.string().required('Choose a service'),
  plan:Yup.string(),
  message:Yup.string().max(500,'Keep the message under 500 characters'),
});
const initial={name:'',mobile:'',email:'',area:'',pincode:'',service:'',plan:'',message:'',website:''};
const control='focus-ring peer w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-[15px] text-ink shadow-sm outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-brand focus:bg-white focus:shadow-[0_0_0_4px_rgba(23,105,255,.09)] dark:border-white/10 dark:bg-[#050D1A] dark:text-white dark:hover:border-brand-cyan/40 dark:focus:border-brand-cyan dark:focus:bg-[#071426]';

export function EnquiryForm(){const[success,setSuccess]=useState(false);const[submitError,setSubmitError]=useState('');return <Formik initialValues={initial} validationSchema={schema} onSubmit={async(values,actions)=>{setSuccess(false);setSubmitError('');try{const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});const result=await response.json() as {ok?:boolean;error?:string};if(!response.ok||!result.ok)throw new Error(result.error||'Unable to send your enquiry.');actions.resetForm();setSuccess(true)}catch(error){setSubmitError(error instanceof Error?error.message:'Unable to send your enquiry. Please try again.')}finally{actions.setSubmitting(false)}}}>{({isSubmitting})=><Form className="relative overflow-hidden rounded-[2rem] border border-blue-200/70 bg-white/95 p-5 text-ink shadow-[0_28px_90px_rgba(11,59,145,.12)] backdrop-blur sm:p-8 lg:p-10 dark:border-brand-cyan/20 dark:bg-gradient-to-br dark:from-[#09182c]/95 dark:to-[#06101f]/95 dark:text-white dark:shadow-[0_30px_100px_rgba(0,0,0,.3)]">
  <Field name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"/>
  <div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-300/15 blur-3xl dark:bg-brand/15"/>
  <div className="relative mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-white/10"><div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand dark:text-brand-cyan">Connection request</p><h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Tell us where to reach you.</h3></div><p className="max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">Required fields are marked with an asterisk.</p></div>
  {success&&<div role="status" className="relative mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300"><CheckCircle2/>Thanks — your enquiry has been emailed to the Mandala Broadband team.</div>}
  {submitError&&<div role="alert" className="relative mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-700 dark:text-red-300">{submitError}</div>}
  <div className="relative grid gap-x-5 gap-y-6 sm:grid-cols-2">
    <Input name="name" label="Full name" required icon={UserRound} placeholder="Your name"/>
    <Input name="mobile" label="Mobile number" required icon={Phone} placeholder="10-digit mobile number" inputMode="numeric"/>
    <Input name="email" label="Email address" icon={Mail} placeholder="you@example.com" type="email"/>
    <Input name="area" label="Area / Locality" required icon={MapPin} placeholder="e.g. Vesu"/>
    <Input name="pincode" label="Pincode" required icon={Hash} placeholder="6-digit pincode" inputMode="numeric"/>
    <Select name="service" label="Service" required icon={Wifi} options={['Home Broadband','Fiber Internet','Business Broadband','Dedicated Support']}/>
    <div className="sm:col-span-2"><Select name="plan" label="Preferred plan" icon={Gauge} options={['50 Mbps Unlimited - 12 / 18 / 24 months','75 Mbps Unlimited - 12 / 18 / 24 months','100 Mbps Unlimited - 12 / 18 / 24 months','1000 Mbps - Request pricing']}/></div>
    <label className="sm:col-span-2"><Label text="Message"/><span className="relative mt-2 block"><MessageSquare aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-4 z-10 text-slate-400 peer-focus:text-brand"/><Field as="textarea" rows={4} name="message" placeholder="Tell us anything that will help with your enquiry" className={`${control} resize-none pl-11`}/></span><Err name="message"/></label>
  </div>
  <div className="relative mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"><p className="max-w-xl text-xs leading-5 text-slate-500 dark:text-slate-400">Your details are sent securely to the Mandala Broadband team for this enquiry. Do not include passwords, payment information or identity documents.</p><button type="submit" disabled={isSubmitting} className="focus-ring inline-flex min-w-48 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-800 via-brand to-sky-400 px-7 py-3.5 font-bold text-white shadow-[0_12px_32px_rgba(23,105,255,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(23,105,255,.35)] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting?'Sending email…':<>Send enquiry<Send size={17}/></>}</button></div>
</Form>}</Formik>}

function Label({text,required=false}:{text:string;required?:boolean}){return <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{text}{required&&<span className="ml-1 text-brand dark:text-brand-cyan">*</span>}</span>}
function Input({name,label,required=false,type='text',icon:Icon,placeholder,inputMode}:{name:string;label:string;required?:boolean;type?:string;icon:ComponentType<LucideProps>;placeholder:string;inputMode?:'numeric'|'text'}){return <label><Label text={label} required={required}/><span className="relative mt-2 block"><Icon aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition peer-focus:text-brand"/><Field name={name} type={type} inputMode={inputMode} placeholder={placeholder} className={control}/></span><Err name={name}/></label>}
function Select({name,label,required=false,icon:Icon,options}:{name:string;label:string;required?:boolean;icon:ComponentType<LucideProps>;options:string[]}){return <label><Label text={label} required={required}/><span className="relative mt-2 block"><Icon aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"/><Field as="select" name={name} className={`${control} select-control appearance-none pr-11`}><option value="">Select an option</option>{options.map(option=><option key={option} value={option}>{option}</option>)}</Field><ChevronDown aria-hidden="true" size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand dark:text-brand-cyan"/></span><Err name={name}/></label>}
function Err({name}:{name:string}){return <ErrorMessage name={name} component="p" className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400"/>}
