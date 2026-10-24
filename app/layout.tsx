import { publicUrl, PUBLIC_ORIGIN } from "@/lib/routing.mjs";
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';
export const metadata: Metadata = {metadataBase:new URL(PUBLIC_ORIGIN),alternates:{canonical:publicUrl()},title:{default:'Natal Lucrativo em Casa | Combo de 7 e-books',template:'%s | Natal Lucrativo em Casa'},description:'Receitas natalinas, panetones, cupcakes, donuts, biscoitos e ceias em um combo de sete e-books.',openGraph:{url:publicUrl(),type:'website',locale:'pt_BR',title:'Natal Lucrativo em Casa',description:'Um combo de 7 e-books para preparar, presentear e compartilhar.'},robots:{index:true,follow:true}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header/>{children}<Footer/></body></html>}
