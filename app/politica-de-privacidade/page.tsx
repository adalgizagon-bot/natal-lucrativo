import { publicUrl } from "@/lib/routing.mjs";
import { Legal } from '@/components/legal';
export const metadata={alternates:{canonical:publicUrl("/politica-de-privacidade")},title:'Política de privacidade',description:'Texto-base sobre privacidade e serviços externos utilizados pelo site.'};
export default function Page(){return <Legal/>}
