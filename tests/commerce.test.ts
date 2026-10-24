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

import { visibleTestimonials } from '../lib/testimonials.ts';
test('produção não apresenta exemplos de depoimentos',()=>{
 assert.deepEqual(visibleTestimonials(true),{items:[],examples:false});
 assert.equal(visibleTestimonials(false).examples,true);
});
