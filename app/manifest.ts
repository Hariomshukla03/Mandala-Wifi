import type {MetadataRoute} from 'next';
export default function manifest():MetadataRoute.Manifest{return{name:'Mandala Broadband',short_name:'Mandala',description:'Fast, reliable fiber internet for Surat.',start_url:'/',display:'standalone',background_color:'#030914',theme_color:'#1769FF',icons:[{src:'/images/mandala-logo-transparent.png',sizes:'1314x1197',type:'image/png'}]}}
