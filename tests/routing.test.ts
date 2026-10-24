import test from 'node:test';
import assert from 'node:assert/strict';
import { BASE_PATH, assetPath, publicUrl } from '../lib/routing.mjs';
test('basePath reserva o namespace natalino', () => assert.equal(BASE_PATH, '/natallucrativo'));
test('imagens públicas recebem um único prefixo, preservando nomes e parâmetros', () => {
  assert.equal(assetPath('/images/Capa de Natal.png'), '/natallucrativo/images/Capa de Natal.png');
  assert.equal(assetPath('/natallucrativo/images/Capa.png'), '/natallucrativo/images/Capa.png');
  assert.throws(() => assetPath('//example.com/a.png'));
});
test('URLs públicas e sitemap não escapam para a raiz do site principal', () => {
  assert.equal(new URL(publicUrl('/cursos')).pathname, '/natallucrativo/cursos');
  assert.equal(new URL(publicUrl()).pathname, '/natallucrativo');
  assert.equal(new URL(publicUrl('/sitemap.xml')).pathname, '/natallucrativo/sitemap.xml');
});
