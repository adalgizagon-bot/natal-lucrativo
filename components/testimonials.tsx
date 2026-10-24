'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import { testimonials, type Testimonial } from '@/lib/testimonials';

function TestimonialImage({ item, large = false }: { item: Testimonial; large?: boolean }) {
  return <div className="testimonial-image">
    <Image src={item.image} alt={item.alt} width={1080} height={1080} sizes={large ? '1080px' : '(max-width: 760px) 85vw, 380px'} className="testimonial-original"/>
    {item.privacyMasks.map((mask, index) => <span key={index} className="privacy-mask" aria-hidden="true" style={{left:`${mask.left}%`,top:`${mask.top}%`,width:`${mask.width}%`,height:`${mask.height}%`}}/>)}
  </div>;
}

export function Testimonials() {
  const carousel = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const [opened, setOpened] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const item = testimonials[selected];

  useEffect(() => {
    if (!opened) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [opened]);

  function open(index: number) {
    setSelected(index);
    setZoomed(false);
    dialog.current?.showModal();
    setOpened(true);
  }
  function close() { dialog.current?.close(); }
  function move(step: number) {
    setSelected(index => (index + step + testimonials.length) % testimonials.length);
    setZoomed(false);
    dialog.current?.querySelector('.lightbox-scroll')?.scrollTo({top:0,left:0});
  }
  function scroll(step: number) {
    const element = carousel.current;
    if (!element) return;
    const card = element.querySelector('article');
    element.scrollBy({left: step * ((card?.getBoundingClientRect().width ?? 320) + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }

  if (!testimonials.length) return null;
  return <section className="section testimonials" aria-labelledby="testimonials-heading"><div className="shell">
    <div className="section-heading"><Heart className="section-icon" aria-hidden="true"/><span className="eyebrow red">CONFIANÇA QUE VEM DE EXPERIÊNCIAS REAIS</span><h2 id="testimonials-heading">Veja o que nossas<br/><em>clientes estão dizendo!</em></h2><p>Conheça experiências reais de clientes que confiaram em nossos materiais de confeitaria.</p></div>
    <div className="testimonial-controls"><span>Deslize para conhecer os relatos · Toque para ampliar</span><div><button type="button" onClick={()=>scroll(-1)} aria-label="Ver depoimentos anteriores" aria-controls="testimonial-carousel"><ArrowLeft size={19}/></button><button type="button" onClick={()=>scroll(1)} aria-label="Ver próximos depoimentos" aria-controls="testimonial-carousel"><ArrowRight size={19}/></button></div></div>
    <div id="testimonial-carousel" ref={carousel} className="testimonial-carousel" role="region" aria-label="Depoimentos reais das clientes" tabIndex={0}>
      {testimonials.map((entry,index)=><article className="testimonial-card" key={entry.id}><button type="button" className="testimonial-expand" onClick={()=>open(index)} aria-label={`Ampliar depoimento ${index+1}`} aria-haspopup="dialog"><TestimonialImage item={entry}/><span className="expand-caption"><span>Depoimento {String(index+1).padStart(2,'0')}</span><span><Maximize2 size={15}/> Ampliar para ler</span></span></button></article>)}
    </div><p className="small-note">Capturas fornecidas pela marca. Mensagens preservadas; identificadores pessoais desnecessários ocultos na exibição.</p>
  </div>
  <dialog ref={dialog} className="testimonial-dialog" aria-labelledby="lightbox-title" onClose={()=>{setOpened(false);setZoomed(false);}} onClick={event=>{if(event.target===event.currentTarget) close();}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}>
    <div className="lightbox-header"><h3 id="lightbox-title" aria-live="polite">Depoimento {selected+1} de {testimonials.length}</h3><button type="button" onClick={close} aria-label="Fechar depoimento ampliado"><X size={23}/></button></div>
    <div className="lightbox-scroll" tabIndex={0} role="region" aria-label="Imagem do depoimento ampliado; role para ler"><div className={zoomed?'lightbox-image zoomed':'lightbox-image'}><TestimonialImage item={item} large/></div></div>
    <div className="lightbox-toolbar"><button type="button" onClick={()=>move(-1)} aria-label="Depoimento anterior"><ArrowLeft size={20}/></button><button type="button" onClick={()=>setZoomed(!zoomed)} aria-pressed={zoomed}>{zoomed?<ZoomOut size={18}/>:<ZoomIn size={18}/>} {zoomed?'Ajustar à tela':'Ampliar mais'}</button><button type="button" onClick={()=>move(1)} aria-label="Próximo depoimento"><ArrowRight size={20}/></button></div>
  </dialog>
  </section>;
}
