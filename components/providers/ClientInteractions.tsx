'use client';
import {useEffect} from 'react';
export function ClientInteractions(){useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const move=(event:PointerEvent)=>{const card=(event.target as HTMLElement).closest<HTMLElement>('.card');if(!card)return;const box=card.getBoundingClientRect();card.style.setProperty('--pointer-x',`${event.clientX-box.left}px`);card.style.setProperty('--pointer-y',`${event.clientY-box.top}px`)};document.addEventListener('pointermove',move,{passive:true});return()=>document.removeEventListener('pointermove',move)},[]);return null}
