import { withBasePath } from './paths.ts';
// Arquivos oficiais recebidos em public/images. Manter nomes e originais intactos.
export const imageFiles = {
  hero: 'imagem topo.png',
  logo: 'Logo Natal Lucrativo em Casa.png',
  covers: {
    '01': 'Cupcakes Natalinos_ Receitas para Vender.png',
    '02': 'Donuts Natalinos_ Receitas para Encantar e Vender.png',
    '03': 'Capa Natalina de Panetone e Chocotone.png',
    '04': 'Natal Lucrativo_ Recheios de Chocotone.png',
    '05': 'Natal Lucrativo_ 15 Receitas Festivas.png',
    '06': 'Natal Lucrativo_ Ceia Festiva em Casa.png',
    '07': 'Biscoitos Decorados Natalinos Lucrativos.png',
  },
};
export const imagePath = (name: string) => withBasePath(`/images/${name}`);
export const officialArt = () => imagePath(imageFiles.hero);
export function materialImage(number: string) {
  const name = imageFiles.covers[number as keyof typeof imageFiles.covers];
  return name ? imagePath(name) : null;
}
