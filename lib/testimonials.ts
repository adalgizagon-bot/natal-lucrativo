import { imagePath } from './images.ts';
export type PrivacyMask = { left: number; top: number; width: number; height: number };
export type Testimonial = {
  id: string;
  image: string;
  alt: string;
  /** Coordenadas percentuais para ocultar somente perfis/identificadores na exibição. */
  privacyMasks: PrivacyMask[];
};
// Capturas reais fornecidas pelo responsável. Não atribuídas ao combo natalino.
// Originais preservados. As máscaras visuais também se aplicam à ampliação.
export const testimonials: Testimonial[] = [
  { id: 'depo-1', image: imagePath('Depo 1.jpg'), alt: 'Relato original de cliente sobre colocar receitas em prática e receber elogios e encomendas.', privacyMasks: [{left:10,top:43.5,width:8,height:6.3}] },
  { id: 'depo-2', image: imagePath('Depo 2.jpg'), alt: 'Capturas originais de clientes sobre experiências com cursos de confeitaria e resultados individuais de vendas.', privacyMasks: [{left:5.5,top:29.8,width:5.5,height:5.1},{left:5.5,top:94,width:5.5,height:5.7}] },
  { id: 'depo-3', image: imagePath('Depo 3.jpg'), alt: 'Relato original sobre receitas, encomendas e satisfação com materiais de confeitaria, acompanhado de fotografia enviada.', privacyMasks: [] },
  { id: 'depo-4', image: imagePath('Depo 4.jpg'), alt: 'Mensagem original de cliente sobre sua produção de confeitaria e aprendizado de gestão financeira.', privacyMasks: [{left:2.5,top:72,width:9,height:9}] },
  { id: 'depo-5', image: imagePath('Depo 5.jpg'), alt: 'Mensagem original de cliente sobre satisfação com um curso de confeitaria e resultado individual.', privacyMasks: [{left:0.5,top:63,width:9,height:9}] },
  { id: 'depo-6', image: imagePath('Depo 6.jpg'), alt: 'Relato original de gratidão pelas receitas e dicas de confeitaria, com fotografia da produção da cliente.', privacyMasks: [] },
  { id: 'depo-7', image: imagePath('Depo 7.jpg'), alt: 'Relato original sobre um primeiro biscoito decorado, acompanhado de fotografia dos biscoitos embalados.', privacyMasks: [{left:12,top:0,width:73,height:11}] },
];
