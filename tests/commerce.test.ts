import test from 'node:test';
import assert from 'node:assert/strict';
import { commerce, discount, materials } from '../lib/config.ts';
test('checkout preserva produto e todos os parâmetros',()=>{
 assert.equal(commerce.checkout,'https://pay.hotmart.com/B41794197O?off=dkr9odoe&checkoutMode=10');
 assert.equal(commerce.price,29.9);
});
test('oferta solicitada calcula economia e percentual',()=>{
 assert.equal(commerce.referencePriceConfirmed,true);
 assert.equal(Number((commerce.referencePrice-commerce.price).toFixed(2)),167.1);
 assert.equal(discount(commerce.price,commerce.referencePrice),85);
});
test('combo contém exatamente sete materiais distintos',()=>{
 assert.equal(materials.length,7);
 assert.equal(new Set(materials.map(m=>m.title)).size,7);
});

import { testimonials } from '../lib/testimonials.ts';
import { imageFiles, materialImage, officialArt } from '../lib/images.ts';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { BASE_PATH, withBasePath } from '../lib/paths.ts';
import { siteUrl } from '../lib/site.ts';
test('arquivos oficiais e sete capas existem e são associados na ordem correta',()=>{
 const expected = ['Cupcakes Natalinos_ Receitas para Vender.png','Donuts Natalinos_ Receitas para Encantar e Vender.png','Capa Natalina de Panetone e Chocotone.png','Natal Lucrativo_ Recheios de Chocotone.png','Natal Lucrativo_ 15 Receitas Festivas.png','Natal Lucrativo_ Ceia Festiva em Casa.png','Biscoitos Decorados Natalinos Lucrativos.png'];
 assert.equal(officialArt(),'/natallucrativo/images/imagem topo.png');
 assert.equal(imageFiles.logo,'Logo Natal Lucrativo em Casa.png');
 for(const [index,material] of materials.entries()) assert.equal(materialImage(material.number),`/natallucrativo/images/${expected[index]}`);
 for(const name of [imageFiles.hero,imageFiles.logo,...expected]) assert(existsSync(path.join(process.cwd(),'public/images',name)),name);
});
test('sete depoimentos fornecidos existem sem nomes, notas ou relatos inventados',()=>{
 assert.equal(testimonials.length,7);
 for(const item of testimonials){
  assert(existsSync(path.join(process.cwd(),'public',item.image.slice(BASE_PATH.length))));
  assert(!('rating' in item));
  assert(!('name' in item));
  for(const mask of item.privacyMasks){
   assert(mask.left>=0 && mask.top>=0 && mask.left+mask.width<=100 && mask.top+mask.height<=100);
  }
 }
});

test('prefixo único e URLs públicas pertencem ao domínio e caminho corretos',()=>{
 assert.equal(BASE_PATH,'/natallucrativo');
 assert.equal(withBasePath('/cursos'),'/natallucrativo/cursos');
 assert.equal(withBasePath('/natallucrativo/cursos'),'/natallucrativo/cursos');
 assert.equal(siteUrl('/cursos'),'https://www.confeitarialucrativaoficial.com/natallucrativo/cursos');
});
