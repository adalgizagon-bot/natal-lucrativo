export const commerce = {
  price: 29.90,
  referencePrice: 197,
  referencePriceConfirmed: false,
  checkout: 'https://pay.hotmart.com/B41794197O?off=dkr9odoe&checkoutMode=10',
  instagram: 'https://www.instagram.com/confeitaria.lucrativabr/',
};
export const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
export const discount = (price: number, reference: number) => Math.round((1 - price / reference) * 100);
export const materials = [
 {title:'Cupcakes Natalinos', description:'Receitas e ideias de decoração para criar cupcakes no clima do Natal.', category:'Pequenos encantos', number:'01'},
 {title:'Donuts Natalinos', description:'Receitas, coberturas e inspirações para donuts natalinos.', category:'Pequenos encantos', number:'02'},
 {title:'Panetone e Chocotone', description:'Conteúdo para aprender a preparar os clássicos das festas de fim de ano.', category:'Clássicos do Natal', number:'03'},
 {title:'Recheios de Chocotone', description:'Ideias de recheios para variar sabores e valorizar as preparações.', category:'Clássicos do Natal', number:'04'},
 {title:'15 Receitas para a Ceia de Ano Novo', description:'Uma seleção de receitas para celebrar a chegada de um novo ano.', category:'À mesa com carinho', number:'05'},
 {title:'10 Receitas para a Ceia de Natal', description:'Receitas para preparar uma ceia especial e compartilhar à mesa.', category:'À mesa com carinho', number:'06'},
 {title:'Biscoitos Decorados Natalinos', description:'Receitas e inspirações de decoração para biscoitos natalinos.', category:'Pequenos encantos', number:'07'},
];
export function whatsappUrl() {
 const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
 return number && /^\d{10,15}$/.test(number) ? `https://wa.me/${number}` : null;
}
