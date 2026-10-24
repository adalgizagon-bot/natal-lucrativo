'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Cookie } from 'lucide-react';
export function Header() {
 const [open,setOpen] = useState(false);
 return <header className="header"><div className="shell header-inner"><Link href="/" className="wordmark" aria-label="Natal Lucrativo em Casa — início"><Cookie size={30}/><span>Natal Lucrativo<small>EM CASA</small></span></Link><button className="menu-toggle" aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="navigation" className={open?'navigation open':'navigation'} aria-label="Principal">{[['/combo-natal-lucrativo','O combo'],['/cursos','Os 7 e-books'],['/contato','Contato']].map(([href,label])=><Link onClick={()=>setOpen(false)} href={href} key={href}>{label}</Link>)}<Link className="nav-cta" href="/combo-natal-lucrativo#oferta" onClick={()=>setOpen(false)}>Conhecer a oferta <span aria-hidden>↗</span></Link></nav></div></header>;
}
