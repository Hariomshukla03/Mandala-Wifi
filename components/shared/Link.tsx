import {Link as RouterLink} from 'react-router-dom';
import type {AnchorHTMLAttributes} from 'react';

type Props=AnchorHTMLAttributes<HTMLAnchorElement>&{href:string};
export default function Link({href,children,...props}:Props){
  return href.startsWith('/')&&!href.startsWith('//')
    ? <RouterLink to={href} {...props}>{children}</RouterLink>
    : <a href={href} {...props}>{children}</a>;
}
