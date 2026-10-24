import { siteUrl } from '@/lib/site';
import type { Metadata } from 'next';
import { SalesPage } from '@/components/sales-page';
export const metadata:Metadata={alternates:{canonical:siteUrl('/combo-natal-lucrativo')},openGraph:{url:siteUrl('/combo-natal-lucrativo'),title:'Natal Lucrativo em Casa',description:'Conheça o combo de sete e-books natalinos.'},title:'Combo Natal Lucrativo — 7 e-books por R$ 29,90',description:'Conheça os sete e-books do Combo Natal Lucrativo em Casa. Receitas para doces natalinos e ceias.'};
export default function Combo(){return <SalesPage sticky/>}
