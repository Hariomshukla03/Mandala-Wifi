'use client';
import {createContext,useContext,useEffect,useState} from 'react';
type Theme='light'|'dark';const C=createContext({theme:'dark' as Theme,toggle:()=>{}});
export function ThemeProvider({children}:{children:React.ReactNode}){const[theme,setTheme]=useState<Theme>('dark');useEffect(()=>{const saved=localStorage.getItem('mandala-theme') as Theme|null;const next=saved??(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');setTheme(next);document.documentElement.classList.toggle('dark',next==='dark')},[]);const toggle=()=>setTheme(t=>{const n=t==='dark'?'light':'dark';localStorage.setItem('mandala-theme',n);document.documentElement.classList.toggle('dark',n==='dark');return n});return <C.Provider value={{theme,toggle}}>{children}</C.Provider>}
export const useTheme=()=>useContext(C);
