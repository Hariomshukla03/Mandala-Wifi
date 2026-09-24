import type {Metadata,Viewport} from 'next';
import {Manrope} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/providers/ThemeProvider';
import {Navbar} from '@/components/layout/Navbar';
import {Footer} from '@/components/layout/Footer';
import {Analytics} from '@/components/providers/Analytics';
import {ClientInteractions} from '@/components/providers/ClientInteractions';
import {StickyWhatsApp} from '@/components/shared/StickyWhatsApp';
import {site} from '@/lib/site';
const manrope=Manrope({subsets:['latin'],variable:'--font-manrope',display:'swap'});
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:'Mandala Broadband — Fast. Reliable. Connected.',template:'%s | Mandala Broadband'},description:site.description,openGraph:{siteName:'Mandala Broadband',type:'website',images:[{url:'/images/hero-poster.png',width:1672,height:935}]},twitter:{card:'summary_large_image',images:['/images/hero-poster.png']},icons:{icon:'/images/mandala-logo-transparent.png',apple:'/images/mandala-logo-transparent.png'},manifest:'/manifest.webmanifest'};
export const viewport:Viewport={themeColor:'#030914',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body className={manrope.variable}><script dangerouslySetInnerHTML={{__html:"try{const t=localStorage.getItem('mandala-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}"}}/><ThemeProvider><ClientInteractions/><Navbar/><main>{children}</main><Footer/><StickyWhatsApp/><Analytics/></ThemeProvider></body></html>}
