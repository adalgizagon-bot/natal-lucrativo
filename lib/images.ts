import { existsSync } from 'node:fs';
import path from 'node:path';
// Somente arquivos reais são exibidos. Não há capas ou fotografias substitutas.
export function officialArt() {
 for (const name of ['combo-oficial.webp','combo-oficial.png','combo-oficial.jpg']) {
  if (existsSync(path.join(process.cwd(), 'public/images', name))) return `/images/${name}`;
 }
 return null;
}
export function materialImage(number: string) {
 const file = `ebook-${number}.webp`;
 return existsSync(path.join(process.cwd(),'public/images',file)) ? `/images/${file}` : null;
}
