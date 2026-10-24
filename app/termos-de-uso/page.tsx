import { siteUrl } from '@/lib/site';
import { Legal } from '@/components/legal';
export const metadata={alternates:{canonical:siteUrl('/termos-de-uso')},openGraph:{url:siteUrl('/termos-de-uso'),title:'Natal Lucrativo em Casa',description:'Conheça o combo de sete e-books natalinos.'},title:'Termos de uso',description:'Informações sobre os materiais digitais e as condições a consultar antes da compra.'};
export default function Page(){return <Legal terms/>}
