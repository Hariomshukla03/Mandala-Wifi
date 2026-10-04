import {useEffect} from 'react';
export function Analytics(){useEffect(()=>{const id=import.meta.env.VITE_ANALYTICS_ID;if(!id)return;const script=document.createElement('script');script.async=true;script.dataset.domain=id;script.src='https://plausible.io/js/script.js';document.head.appendChild(script);return()=>script.remove()},[]);return null}
