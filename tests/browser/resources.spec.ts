import { test, expect } from '@playwright/test';

test('recursos, navegação e canonical permanecem no prefixo', async ({page}) => {
 const response = await page.goto('/natallucrativo');
 expect(response?.status()).toBe(200);
 expect(response?.headers().location).toBeUndefined();
 const scripts = await page.locator('script[src]').evaluateAll(es => es.map(e => e.getAttribute('src')!));
 expect(scripts.length).toBeGreaterThan(0);
 expect(scripts.every(src => src.startsWith('/natallucrativo/_next/'))).toBeTruthy();
 const styles = await page.locator('link[rel="stylesheet"]').evaluateAll(es => es.map(e => e.getAttribute('href')!));
 expect(styles.length).toBeGreaterThan(0);
 for (const src of [...scripts,...styles]) expect((await page.request.get(src)).status()).toBe(200);
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://www.confeitarialucrativaoficial.com/natallucrativo');
 for(const link of await page.locator('a[href^="/"]').all()) expect(await link.getAttribute('href')).toMatch(/^\/natallucrativo(?:\/|$|#)/);
 if(await page.getByRole('button',{name:'Abrir menu'}).isVisible()) await page.getByRole('button',{name:'Abrir menu'}).click();
 await page.getByRole('navigation',{name:'Principal'}).getByRole('link',{name:'Os 7 e-books',exact:true}).click();
 await expect(page).toHaveURL(/\/natallucrativo\/cursos$/);
 await expect(page.locator('h1')).toHaveText('Conheça os 7 e-books');
});

test('arquivos públicos e otimizador Next Image funcionam por dentro do proxy', async ({request}) => {
 const src='/natallucrativo/images/Logo Natal Lucrativo em Casa.png';
 const file=await request.get(src);
 expect(file.status()).toBe(200);
 expect(file.headers()['content-type']).toContain('image/png');
 const optimized=await request.get(`/natallucrativo/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`);
 expect(optimized.status()).toBe(200);
 expect(optimized.headers()['content-type']).toMatch(/^image\//);
 const flight=await request.get('/natallucrativo/cursos?_rsc=proxy-test',{headers:{RSC:'1'}});
 expect(flight.status()).toBe(200);
 expect(flight.headers()['content-type']).toContain('text/x-component');
 const sitemap=await request.get('/natallucrativo/sitemap.xml');
 expect(sitemap.status()).toBe(200);
 expect(await sitemap.text()).toContain('https://www.confeitarialucrativaoficial.com/natallucrativo/cursos');
});

test('o host principal mantém páginas, checkout e recursos isolados', async ({page,request}) => {
 test.skip(process.env.PROXY_HOST_UNDER_TEST !== '1', 'Verificação exige o servidor principal com rewrite para o natalino.');
 await page.goto('/');
 await expect(page.locator('h1')).toContainText('Já imaginou');
 const mainScripts=await page.locator('script[src]').evaluateAll(es=>es.map(e=>e.getAttribute('src')!));
 expect(mainScripts.every(src=>src.startsWith('/_next/'))).toBeTruthy();
 await expect(page.locator('a[href*="pay.hotmart.com"]').first()).toHaveAttribute('href','https://pay.hotmart.com/E50600326X?off=e7noowd3&checkoutMode=10');
 await page.goto('/cursos');
 await expect(page.locator('h1')).toHaveText('Aprender. Criar. Se surpreender.');
 expect((await request.get('/images/topo.png')).status()).toBe(200);
 expect((await request.get('/natallucrativo/images/topo.png')).status()).toBe(404);
 expect((await request.get('/natallucrativo-inexistente')).status()).toBe(404);
 await page.goto('/natallucrativo/contato?utm_source=proxy-test');
 await expect(page).toHaveURL(/\/natallucrativo\/contato\?utm_source=proxy-test$/);
 await expect(page.locator('h1')).toContainText('Um canal aberto');
});
