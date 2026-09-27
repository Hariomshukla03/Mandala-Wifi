'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {Menu,X,Moon,Sun} from 'lucide-react';
import {useTheme} from '@/components/providers/ThemeProvider';

const links=[['Plans','/plans'],['Services','/services'],['Coverage','/coverage'],['Business','/business-broadband'],['About','/about']];

export function Navbar(){
  const[open,setOpen]=useState(false);
  const{theme,toggle}=useTheme();
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-950/10 bg-white/90 text-[#102f60] shadow-[0_8px_32px_rgba(8,38,92,.06)] backdrop-blur-xl dark:border-white/10 dark:bg-night/80 dark:text-white dark:shadow-none">
    <nav className="container-x flex h-20 items-center justify-between" aria-label="Primary navigation">
      <Link href="/" className="focus-ring flex items-center gap-3">
        <span className="relative h-14 w-14 shrink-0 overflow-hidden">
          <Image src="/images/mandala-logo-transparent.png" alt="Mandala Broadband logo" width={90} height={90} priority className="absolute left-1/2 top-0 h-[90px] w-[90px] max-w-none -translate-x-1/2 object-contain invert dark:invert-0"/>
        </span>
        <span className="leading-none">
          <strong className="block text-sm tracking-[.18em] sm:text-base">MANDALA</strong>
          <span className="mt-1 block text-[9px] font-bold tracking-[.24em] text-blue-600 sm:text-[10px] dark:text-brand-cyan">BROADBAND</span>
        </span>
      </Link>
      <div className="hidden items-center gap-7 lg:flex">
        {links.map(([name,href])=><Link key={href} className="text-sm text-[#3e5678] transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-white" href={href}>{name}</Link>)}
        <Link href="/contact" className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">Get connected</Link>
        <button aria-label="Toggle color theme" onClick={toggle} className="focus-ring rounded-full border border-blue-950/15 p-2.5 dark:border-white/15">{theme==='dark'?<Sun size={17}/>:<Moon size={17}/>}</button>
      </div>
      <button className="focus-ring lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </nav>
    {open&&<div className="container-x flex flex-col gap-5 border-t border-blue-950/10 py-6 lg:hidden dark:border-white/10">
      {links.map(([name,href])=><Link onClick={()=>setOpen(false)} key={href} href={href}>{name}</Link>)}
      <div className="flex items-center justify-between border-t border-blue-950/10 pt-5 dark:border-white/10">
        <Link onClick={()=>setOpen(false)} href="/contact" className="font-bold text-blue-700 dark:text-brand-cyan">Get connected</Link>
        <button aria-label="Toggle color theme" onClick={toggle} className="focus-ring flex items-center gap-2 rounded-full border border-blue-950/15 px-4 py-2.5 text-sm font-bold dark:border-white/15">{theme==='dark'?<><Sun size={17}/>Light mode</>:<><Moon size={17}/>Dark mode</>}</button>
      </div>
    </div>}
  </header>;
}
