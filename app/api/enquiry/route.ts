import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';
import {contactEmail} from '@/data/terms';

export const runtime='nodejs';

type Enquiry={name:string;mobile:string;email?:string;area:string;pincode:string;service:string;plan?:string;message?:string;website?:string};
const clean=(value:unknown,max=500)=>typeof value==='string'?value.trim().slice(0,max):'';
const escapeHtml=(value:string)=>value.replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]??char));

export async function POST(request:Request){
  try{
    const contentLength=Number(request.headers.get('content-length')??0);
    if(contentLength>20_000)return NextResponse.json({error:'Request is too large.'},{status:413});
    const raw=await request.json() as Partial<Enquiry>;
    if(clean(raw.website))return NextResponse.json({ok:true});
    const enquiry:Enquiry={name:clean(raw.name,60),mobile:clean(raw.mobile,10),email:clean(raw.email,120),area:clean(raw.area,80),pincode:clean(raw.pincode,6),service:clean(raw.service,80),plan:clean(raw.plan,80),message:clean(raw.message,500)};
    if(enquiry.name.length<2||!/^[6-9]\d{9}$/.test(enquiry.mobile)||!/^\d{6}$/.test(enquiry.pincode)||!enquiry.area||!enquiry.service||Boolean(enquiry.email&&!/^\S+@\S+\.\S+$/.test(enquiry.email))){return NextResponse.json({error:'Please check the submitted details.'},{status:400})}
    const host=process.env.SMTP_HOST??'smtp.gmail.com';
    const port=Number(process.env.SMTP_PORT??465);
    const user=process.env.SMTP_USER;
    const pass=process.env.SMTP_PASS;
    if(!user||!pass){console.error('Enquiry email is not configured: SMTP_USER or SMTP_PASS is missing.');return NextResponse.json({error:'Email delivery is not configured yet. Please contact Mandala Broadband directly.'},{status:503})}
    const to=process.env.ENQUIRY_TO_EMAIL??contactEmail;
    const fromAddress=process.env.SMTP_FROM_EMAIL??contactEmail;
    const rows=[['Full name',enquiry.name],['Mobile',enquiry.mobile],['Email',enquiry.email||'Not provided'],['Area / Locality',enquiry.area],['Pincode',enquiry.pincode],['Service',enquiry.service],['Preferred plan',enquiry.plan||'Not selected'],['Message',enquiry.message||'Not provided']];
    const transporter=nodemailer.createTransport({host,port,secure:port===465,auth:{user,pass},requireTLS:port===587,connectionTimeout:15_000,greetingTimeout:10_000,socketTimeout:20_000});
    await transporter.sendMail({from:{name:'Mandala Broadband Website',address:fromAddress},to,replyTo:enquiry.email?{name:enquiry.name,address:enquiry.email}:undefined,subject:`New Mandala Broadband enquiry — ${enquiry.name} — ${enquiry.pincode}`,html:`<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#071426"><div style="background:#071426;color:#fff;padding:24px;border-radius:16px 16px 0 0"><div style="font-size:12px;letter-spacing:2px;color:#35C8FF">MANDALA BROADBAND WEBSITE</div><h1 style="margin:8px 0 0;font-size:26px">New internet enquiry</h1></div><div style="border:1px solid #dbeafe;border-top:0;padding:24px;border-radius:0 0 16px 16px">${rows.map(([label,value])=>`<div style="padding:12px 0;border-bottom:1px solid #e2e8f0"><strong style="display:inline-block;width:150px">${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></div>`).join('')}<p style="margin-top:22px;color:#64748b;font-size:12px">Submitted from the Mandala Broadband website on ${escapeHtml(new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}))} IST.</p></div></div>`,text:rows.map(([label,value])=>`${label}: ${value}`).join('\n')});
    return NextResponse.json({ok:true});
  }catch(error){console.error('Nodemailer enquiry submission failed:',error);return NextResponse.json({error:'We could not send your enquiry. Please try again or use WhatsApp.'},{status:502})}
}
