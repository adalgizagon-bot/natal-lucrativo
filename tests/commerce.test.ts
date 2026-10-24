import test from 'node:test';
import assert from 'node:assert/strict';
import { commerce, discount, materials } from '../lib/config.ts';
test('checkout preserva produto e todos os parâmetros',()=>{
 assert.equal(commerce.checkout,'https://pay.hotmart.com/B41794197O?off=dkr9odoe&checkoutMode=10');
 assert.equal(commerce.price,29.9);
});
test('comparação comercial permanece desativada até confirmação',()=>{
 assert.equal(commerce.referencePriceConfirmed,false);
 assert.equal(discount(commerce.price,commerce.referencePrice),85);
});
test('combo contém exatamente sete materiais distintos',()=>{
 assert.equal(materials.length,7);
 assert.equal(new Set(materials.map(m=>m.title)).size,7);
});
