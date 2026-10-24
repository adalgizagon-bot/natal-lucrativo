import { BASE_PATH, withBasePath } from '../../lib/paths';
import { test, expect } from '@playwright/test';
const routes=['/','/combo-natal-lucrativo','/cursos','/contato','/politica-de-privacidade','/termos-de-uso'];
for(const route of routes) test(`página ${route}: navegação, layout e links`,async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(withBasePath(route));
 expect(response?.status()).toBe(200);
 const localLinks=await page.locator('a[href^="/"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
 expect(localLinks.every(href=>href?.startsWith(BASE_PATH))).toBeTruthy();
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('h1')).toBeVisible();
 await expect(page.locator('.example-notice')).toHaveCount(0);
 if(route==='/' || route==='/combo-natal-lucrativo'){
  await expect(page.locator('.hero .old-price')).toContainText('197,00');
  await expect(page.locator('.hero .price')).toContainText('29,90');
  await expect(page.locator('.hero .saving')).toContainText('167,10');
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
 const links=page.locator('a[href*="pay.hotmart.com"]');
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('href','https://pay.hotmart.com/B41794197O?off=dkr9odoe&checkoutMode=10');
  await expect(link).toHaveAttribute('rel','noopener noreferrer');
 }
 const images=page.locator('img:visible');
 for(const img of await images.all()){
  await img.scrollIntoViewIfNeeded();
  await expect(img).toBeVisible();
  await expect.poll(()=>img.evaluate(i=>(i as HTMLImageElement).complete&&(i as HTMLImageElement).naturalWidth>0)).toBeTruthy();
 }
 if(route==='/combo-natal-lucrativo'){
  await page.locator('summary').first().click();
  await expect(page.locator('details').first()).toHaveAttribute('open','');
  if(info.project.name==='mobile') await expect(page.locator('.mobile-bar')).toBeVisible();
 }
 if(info.project.name==='mobile'){
  await page.getByRole('button',{name:'Abrir menu'}).click();
  await expect(page.getByRole('navigation',{name:'Principal'})).toBeVisible();
  await page.getByRole('navigation',{name:'Principal'}).getByRole('link',{name:'Contato',exact:true}).click();
  await expect(page).toHaveURL(/\/contato$/);
 }
 expect(errors).toEqual([]);
});

for(const route of ['/','/combo-natal-lucrativo']) test(`imagens oficiais e ampliação acessível ${route}`,async({page})=>{
 await page.goto(withBasePath(route));
 await expect(page.locator('.official-logo')).toHaveAttribute('alt','Natal Lucrativo em Casa');
 await expect(page.locator('.hero-image')).toBeVisible();
 await expect(page.locator('.catalog .cover img')).toHaveCount(7);
 await expect(page.locator('.testimonial-card')).toHaveCount(7);
 await expect(page.locator('.art-reserved,.cover-reserved,.example-notice')).toHaveCount(0);
 const trigger=page.getByRole('button',{name:'Ampliar depoimento 1',exact:true});
 await trigger.click();
 const modal=page.getByRole('dialog');
 await expect(modal).toBeVisible();
 await expect(modal.getByRole('heading')).toHaveText('Depoimento 1 de 7');
 await expect(modal.locator('.privacy-mask')).toHaveCount(1);
 await expect.poll(()=>modal.locator('img').evaluate(i=>(i as HTMLImageElement).complete&&(i as HTMLImageElement).naturalWidth>0)).toBeTruthy();
 await modal.getByRole('button',{name:'Ampliar mais'}).click();
 await expect(modal.locator('.lightbox-image')).toHaveClass(/zoomed/);
 await modal.getByRole('button',{name:'Próximo depoimento',exact:true}).click();
 await expect(modal.getByRole('heading')).toHaveText('Depoimento 2 de 7');
 await expect(modal.locator('.privacy-mask')).toHaveCount(2);
 await page.keyboard.press('ArrowLeft');
 await expect(modal.getByRole('heading')).toHaveText('Depoimento 1 de 7');
 await page.keyboard.press('Escape');
 await expect(modal).not.toBeVisible();
 await expect(trigger).toBeFocused();
 await page.getByRole('button',{name:'Ampliar depoimento 7',exact:true}).click();
 await expect(modal.getByRole('heading')).toHaveText('Depoimento 7 de 7');
 await expect(modal.locator('.privacy-mask')).toHaveCount(1);
 await modal.getByRole('button',{name:'Fechar depoimento ampliado'}).click();
 await expect(modal).not.toBeVisible();
});

 test('SEO e recursos usam exclusivamente o prefixo do projeto',async({page,request})=>{
  const sitemap=await request.get(withBasePath('/sitemap.xml'));
  expect(sitemap.status()).toBe(200);
  const xml=await sitemap.text();
  const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
  expect(urls).toHaveLength(6);
  expect(urls.every(url=>url.startsWith('https://www.confeitarialucrativaoficial.com/natallucrativo'))).toBeTruthy();
  const robots=await request.get(withBasePath('/robots.txt'));
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('https://www.confeitarialucrativaoficial.com/natallucrativo/sitemap.xml');
  for(const route of routes){
   await page.goto(withBasePath(route));
   const expected=`https://www.confeitarialucrativaoficial.com${withBasePath(route==='/'?'':route)}`;
   await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',expected);
   await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content',expected);
   const resources=await page.locator('script[src],link[rel="stylesheet"]').evaluateAll(elements=>elements.map(el=>el.getAttribute('src')||el.getAttribute('href')));
   expect(resources.length).toBeGreaterThan(0);
   expect(resources.every(url=>url?.startsWith('/natallucrativo/'))).toBeTruthy();
  }
  // Este projeto só responde sob seu prefixo, sem assumir a raiz do domínio.
  expect((await request.get('/')).status()).toBe(404);
 });
