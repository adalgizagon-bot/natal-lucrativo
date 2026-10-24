import { publicUrl } from "@/lib/routing.mjs";
import { Legal } from '@/components/legal';
export const metadata={alternates:{canonical:publicUrl("/termos-de-uso")},title:'Termos de uso',description:'Informações sobre os materiais digitais e as condições a consultar antes da compra.'};
export default function Page(){return <Legal terms/>}
