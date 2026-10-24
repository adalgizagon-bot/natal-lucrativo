import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Heart, ChefHat, Gift, ArrowDown, Check, ShoppingBag, ArrowUpRight, TreePine, Sparkles } from 'lucide-react';
import { Offer } from './offer';
import { Catalog } from './catalog';
import { Testimonials } from './testimonials';
import { officialArt } from '@/lib/images';
const questions = [
 ['O que está incluído no combo?','São sete e-books: Cupcakes Natalinos, Donuts Natalinos, Panetone e Chocotone, Recheios de Chocotone, 15 Receitas para a Ceia de Ano Novo, 10 Receitas para a Ceia de Natal e Biscoitos Decorados Natalinos.'],
 ['O conteúdo é físico ou digital?','O combo é composto por e-books digitais. Não inclui livros impressos ou produtos físicos.'],
 ['Preciso acompanhar aulas em horário marcado?','O material é em formato de e-book, para consultar no seu ritmo. Não há aulas em vídeo anunciadas nesta oferta.'],
 ['Posso usar as receitas para produzir e vender?','Você pode explorar as receitas na sua produção de fim de ano. Os resultados dependem da prática, dos custos e da realidade do seu negócio; não há promessa de renda.'],
 ['Como recebo o material?','A compra é feita no checkout da Hotmart. Confira ali as condições de entrega e acesso antes de concluir o pagamento e siga as instruções apresentadas após a compra.'],
 ['Onde tiro dúvidas sobre a compra?','Fale com a marca pelo Instagram indicado na página de contato. Para condições de pagamento, entrega e eventual reembolso, consulte as informações do checkout antes de comprar.'],
];

function FestiveDetails() {
  return <div className="festive-details" aria-hidden="true"><TreePine/><span/><span/><span/><Sparkles/><span/><span/><span/><TreePine/></div>;
}
export function SalesPage({sticky=false}:{sticky?:boolean}) {
 const art = officialArt();
 return <main id="conteudo" className={sticky?'with-sticky':''}>
  <div className="announcement"><Gift size={15} aria-hidden="true"/> UM NATAL DE NOVAS POSSIBILIDADES · 7 E-BOOKS EM UM COMBO</div>
  <section className="hero"><FestiveDetails/><div className="shell hero-grid">
   <div className="hero-visual">
    <div className="official-art"><Image src={art} alt="Combo Natal Lucrativo em Casa: confeiteira com celular, doces natalinos e os sete e-books" width={1536} height={1024} preload sizes="(max-width: 760px) 100vw, (max-width: 1200px) 55vw, 700px" className="hero-image"/></div>
    <div className="visual-caption"><span>RECEITAS PARA PREPARAR EM CASA E CRIAR NOVAS POSSIBILIDADES</span><Heart size={16}/></div>
   </div>
   <div className="hero-copy"><span className="pill"><TreePine size={14}/> COMBO NATAL LUCRATIVO EM CASA</span>
    <h1>Transforme o Natal em uma oportunidade de <em>renda extra!</em></h1>
    <p className="lead">Aprenda a preparar delícias natalinas que encantam, surpreendem e podem se transformar em uma excelente oportunidade de vendas no fim do ano!</p>
    <p className="intro">São <strong>7 e-books digitais</strong> com receitas para você preparar em casa, presentear, compartilhar com a família ou começar a aceitar encomendas neste Natal.</p>
    <Offer/>
   </div>
  </div></section>
  <div className="promise-strip"><div className="shell"><span><BookOpen/> 7 e-books para inspirar você</span><span><Gift/> Prepare, presenteie e ofereça</span><span><ChefHat/> Da sua cozinha, no seu ritmo</span></div></div>
  <section className="section opportunity"><div className="shell opportunity-grid"><div><span className="eyebrow red">UMA RECEITA. UM PRIMEIRO PASSO.</span><h2>E se neste Natal você pudesse transformar sua cozinha em uma <em>fonte de renda extra?</em></h2></div><div><p>Imagine preparar cupcakes decorados, biscoitos natalinos, panetones e chocotones para oferecer a amigos, vizinhos, colegas e clientes.</p><p>Com boas receitas, capricho e organização, você pode criar produtos especiais e começar a explorar as oportunidades de vendas de fim de ano.</p><p className="opportunity-highlight">O primeiro passo pode começar com uma receita. E essa receita pode abrir as portas para novas oportunidades!</p><small>Os resultados dependem da prática, dos custos e da realidade de cada pessoa. Não há ganhos garantidos.</small></div></div></section>
  <section className="section benefits-section"><div className="shell"><div className="section-heading"><TreePine className="section-icon" aria-hidden="true"/><span className="eyebrow red">MAIS SABOR PARA SEUS PLANOS</span><h2>O Natal pode ser a sua<br/><em>oportunidade de começar!</em></h2><p>Um presente feito por você. Uma nova receita na mesa. Ou o primeiro passo para receber encomendas.</p></div><div className="benefits">
   {[{Icon:Gift,title:'Presenteie com carinho',text:'Prepare doces especiais e surpreenda quem você ama.'},{Icon:ChefHat,title:'Crie produtos para vender',text:'Explore ideias de doces natalinos para oferecer por encomenda.'},{Icon:BookOpen,title:'Aprenda no seu ritmo',text:'Tenha receitas digitais para consultar em casa e organizar sua produção.'}].map(({Icon,title,text})=><article key={title}><div className="benefit-icon"><Icon size={29}/></div><h3>{title}</h3><p>{text}</p></article>)}
  </div></div></section>
  <section id="materiais" className="section catalog-section"><div className="shell"><div className="section-heading"><Gift className="section-icon" aria-hidden="true"/><span className="eyebrow red">SEU COMBO DE FIM DE ANO</span><h2>Veja tudo o que<br/><em>você vai receber!</em></h2><p>Sete e-books, dos doces aos encontros à mesa. Uma coleção para você explorar novas receitas sem investir em um curso caro.</p></div><Catalog/><p className="small-note">Combo digital com os sete e-books apresentados. Imagens oficiais dos materiais.</p></div></section>
  <section className="section shell audience"><div><span className="eyebrow red">O CARINHO É SEU. AS IDEIAS ESTÃO AQUI.</span><h2>Para quem tem vontade<br/>de criar <em>algo especial.</em></h2><p>Da sobremesa para a família ao presente de Natal, cada preparo pode ser um novo começo. Teste receitas, capriche na apresentação e explore a possibilidade de aceitar encomendas e criar produtos para vender.</p><ul className="check-list">{['Aprenda receitas especiais para o Natal.','Prepare presentes para familiares e amigos.','Explore a procura por doces e presentes natalinos.','Organize uma produção caseira e teste suas ideias.','Consulte os materiais digitais no seu ritmo.'].map(t=><li key={t}><Check size={19}/>{t}</li>)}</ul></div><div className="commercial"><Sparkles size={30}/><h3>Do carinho na receita ao capricho na encomenda.</h3><p>Encontre inspiração para começar com o que faz sentido para você.</p><Offer/></div></section>
  <Testimonials/>
  <section className="section steps-section"><div className="shell"><div className="section-heading"><span className="eyebrow red">SEU PRIMEIRO PASSO É SIMPLES</span><h2>Do combo para<br/><em>a sua cozinha.</em></h2></div><div className="steps">{[['01','Escolha seu próximo Natal','Conheça os sete e-books e as possibilidades que você quer explorar.'],['02','Compre na Hotmart','O botão abre o checkout oficial. Confira preço e condições antes de concluir a compra.'],['03','Prepare suas primeiras receitas','Siga as instruções de acesso apresentadas após a compra e comece a explorar os materiais.']].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
  <section className="section shell faq"><div><span className="eyebrow red">PODE PERGUNTAR</span><h2>Vamos tirar<br/><em>suas dúvidas?</em></h2><p>Confira as respostas ou <Link href="/contato">fale com a marca <ArrowUpRight size={14} aria-hidden="true" className="inline"/></Link>.</p></div><div>{questions.map(([q,a])=><details key={q}><summary>{q}<ArrowDown size={17}/></summary><p>{a}</p></details>)}</div></section>
  <section id="oferta" className="final-offer"><FestiveDetails/><div className="shell final-inner"><div><span className="eyebrow">O SEU NATAL PODE COMEÇAR AGORA</span><h2>Não deixe este Natal passar sem descobrir <em>o que você é capaz de criar!</em></h2><p>Seja para adoçar momentos especiais, preparar presentes ou começar a vender suas próprias delícias, o Combo Natal Lucrativo em Casa reúne receitas para você dar o primeiro passo.</p><span className="final-detail"><ShoppingBag size={18}/> Uma coleção. Sete e-books. Muitas possibilidades.</span></div><Offer final/></div></section>
  {sticky&&<aside className="mobile-bar" aria-label="Oferta do combo"><Offer compact/></aside>}
 </main>;
}
