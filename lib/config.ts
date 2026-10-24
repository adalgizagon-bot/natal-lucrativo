export const commerce = {
  price: 29.90,
  referencePrice: 197,
  referencePriceConfirmed: true,
  checkout: 'https://pay.hotmart.com/B41794197O?off=dkr9odoe&checkoutMode=10',
  instagram: 'https://www.instagram.com/confeitaria.lucrativabr/',
};
export const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
export const discount = (price: number, reference: number) => Math.round((1 - price / reference) * 100);
export const materials = [
 {title:'Cupcakes Natalinos', description:'Transforme pequenos bolinhos em presentes cheios de encanto com receitas e ideias de decoração natalina.', benefit:'Para montar caixas de presentes e oferecer por encomenda.', category:'Pequenos encantos', number:'01'},
 {title:'Donuts Natalinos', description:'Explore receitas e coberturas para dar um toque de Natal aos donuts e ampliar seu repertório.', benefit:'Para variar o cardápio com doces que chamam a atenção.', category:'Pequenos encantos', number:'02'},
 {title:'Panetone e Chocotone', description:'Aprenda a preparar os clássicos que têm lugar especial na mesa e nos presentes de fim de ano.', benefit:'Para preparar em casa e explorar encomendas natalinas.', category:'Clássicos do Natal', number:'03'},
 {title:'Recheios de Chocotone', description:'Descubra combinações para variar os sabores e deixar suas preparações ainda mais especiais.', benefit:'Para criar novas versões do seu chocotone.', category:'Clássicos do Natal', number:'04'},
 {title:'15 Receitas para a Ceia de Ano Novo', description:'Reúna a família ao redor de uma mesa especial com 15 ideias para celebrar um novo começo.', benefit:'Para planejar uma ceia cheia de sabor.', category:'À mesa com carinho', number:'05'},
 {title:'10 Receitas para a Ceia de Natal', description:'Encontre 10 receitas para preparar com carinho e compartilhar na noite mais acolhedora do ano.', benefit:'Para organizar uma ceia especial em casa.', category:'À mesa com carinho', number:'06'},
 {title:'Biscoitos Decorados Natalinos', description:'Dê forma ao espírito natalino com receitas e inspirações para decorar biscoitos.', benefit:'Para presentear em embalagens caprichadas.', category:'Pequenos encantos', number:'07'},
];
export function whatsappUrl() {
 const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
 return number && /^\d{10,15}$/.test(number) ? `https://wa.me/${number}` : null;
}
