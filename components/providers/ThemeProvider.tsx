'use client';
import {createContext,useContext,useEffect,useState} from 'react';
type Theme='light'|'dark';const THEME_KEY='mandala-theme-v2';const C=createContext({theme:'light' as Theme,toggle:()=>{}});
export function ThemeProvider({children}:{children:React.ReactNode}){const[theme,setTheme]=useState<Theme>('light');useEffect(()=>{const saved=localStorage.getItem(THEME_KEY) as Theme|null;const next=saved==='dark'?'dark':'light';setTheme(next);document.documentElement.classList.toggle('dark',next==='dark')},[]);const toggle=()=>setTheme(t=>{const n=t==='dark'?'light':'dark';localStorage.setItem(THEME_KEY,n);document.documentElement.classList.toggle('dark',n==='dark');return n});return <C.Provider value={{theme,toggle}}>{children}</C.Provider>}
export const useTheme=()=>useContext(C);
