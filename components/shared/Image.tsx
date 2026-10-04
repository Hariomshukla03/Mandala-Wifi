import type {CSSProperties,ImgHTMLAttributes} from 'react';

type Props=ImgHTMLAttributes<HTMLImageElement>&{fill?:boolean;priority?:boolean};
export default function Image({fill,priority,style,loading,...props}:Props){
  const fillStyle:CSSProperties|undefined=fill?{position:'absolute',inset:0,width:'100%',height:'100%'}:undefined;
  return <img {...props} loading={priority?'eager':loading??'lazy'} decoding="async" style={{...fillStyle,...style}}/>;
}
