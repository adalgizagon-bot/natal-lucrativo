import { test, expect } from '@playwright/test';
const routes=['/','/combo-natal-lucrativo','/cursos','/contato','/politica-de-privacidade','/termos-de-uso'];
for(const route of routes) test(`página ${route}: navegação, layout e links`,async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(`/natallucrativo${route === "/" ? "" : route}`);
 expect(response?.status()).toBe(200);
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('h1')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
 const links=page.locator('a[href*="pay.hotmart.com"]');
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('href','https://pay.hotmart.com/B41794197O?off=dkr9odoe&checkoutMode=10');
  await expect(link).toHaveAttribute('rel','noopener noreferrer');
 }
 expect(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>(i as HTMLImageElement).complete&&(i as HTMLImageElement).naturalWidth>0))).toBeTruthy();
 if(route==='/combo-natal-lucrativo'){
  await page.locator('summary').first().click();
  await expect(page.locator('details').first()).toHaveAttribute('open','');
  if(info.project.name==='mobile') await expect(page.locator('.mobile-bar')).toBeVisible();
 }
 if(info.project.name==='mobile'){
  await page.getByRole('button',{name:'Abrir menu'}).click();
  await expect(page.getByRole('navigation',{name:'Principal'})).toBeVisible();
  await page.getByRole('navigation',{name:'Principal'}).getByRole('link',{name:'Contato',exact:true}).click();
  await expect(page).toHaveURL(/\/natallucrativo\/contato$/);
 }
 expect(errors).toEqual([]);
});
