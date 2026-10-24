import { siteUrl } from '@/lib/site';
import { Legal } from '@/components/legal';
export const metadata={alternates:{canonical:siteUrl('/politica-de-privacidade')},openGraph:{url:siteUrl('/politica-de-privacidade'),title:'Natal Lucrativo em Casa',description:'Conheça o combo de sete e-books natalinos.'},title:'Política de privacidade',description:'Texto-base sobre privacidade e serviços externos utilizados pelo site.'};
export default function Page(){return <Legal/>}
