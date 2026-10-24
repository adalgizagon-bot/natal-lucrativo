import { publicUrl } from "@/lib/routing.mjs";
import type { Metadata } from 'next';
import { SalesPage } from '@/components/sales-page';
export const metadata:Metadata={alternates:{canonical:publicUrl("/combo-natal-lucrativo")},title:'Combo Natal Lucrativo — 7 e-books por R$ 29,90',description:'Conheça os sete e-books do Combo Natal Lucrativo em Casa. Receitas para doces natalinos e ceias.'};
export default function Combo(){return <SalesPage sticky/>}
