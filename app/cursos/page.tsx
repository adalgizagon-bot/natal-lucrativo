import { publicUrl } from "@/lib/routing.mjs";
import { Catalog } from '@/components/catalog';
import { Offer } from '@/components/offer';
export const metadata={alternates:{canonical:publicUrl("/cursos")},title:'Catálogo dos sete e-books',description:'Explore os sete materiais digitais do Combo Natal Lucrativo em Casa.'};
export default function Cursos(){return <main id="conteudo"><section className="section shell"><div className="section-heading"><span className="eyebrow red">SEU REPERTÓRIO DE FIM DE ANO</span><h1 className="page-title">Conheça os 7 e-books</h1><p>Apesar do nome desta seção, os materiais são e-books. Não são anunciadas aulas em vídeo ou certificados.</p></div><Catalog/><p className="small-note">Capas oficiais aguardando envio.</p></section><section className="final-offer"><div className="shell narrow"><h2>Todos os materiais em um combo.</h2><Offer/></div></section></main>}
