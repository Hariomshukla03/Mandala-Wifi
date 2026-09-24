import {type ReactNode} from 'react';
import {BusinessLocation} from '@/components/shared/BusinessLocation';

export default function ContactLayout({children}:{children:ReactNode}){
  return <>{children}<BusinessLocation/></>;
}
