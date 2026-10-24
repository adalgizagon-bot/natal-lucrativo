import Image from 'next/image';
import { Heart, Quote, Star } from 'lucide-react';
import { visibleTestimonials } from '@/lib/testimonials';
export function Testimonials() {
  const { items, examples } = visibleTestimonials(process.env.NODE_ENV === 'production');
  if (!items.length) return null;
  return <section className="section testimonials"><div className="shell">
    <div className="section-heading"><Heart className="section-icon" aria-hidden="true" /><span className="eyebrow red">EXPERIÊNCIAS QUE CONECTAM</span><h2>Quem aprende, <em>recomenda!</em></h2>
      {examples ? <p className="example-notice">EXEMPLOS DE LAYOUT · Somente em desenvolvimento. Não são depoimentos reais.</p> : <p>Veja experiências compartilhadas por alunas que já conheceram nossos materiais e descobriram novas possibilidades na confeitaria.</p>}</div>
    <div className="testimonial-carousel" role="region" aria-label="Depoimentos; deslize ou use as setas do teclado" tabIndex={0}>
      {items.map(item => <article className="testimonial-card" key={item.id}><Quote size={26} aria-hidden="true" />
        {item.rating && <div className="rating" aria-label={`${item.rating} de 5 estrelas`}>{Array.from({ length: item.rating }, (_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}</div>}
        <p>{item.text}</p><div className="testimonial-person">{item.photo && <Image src={item.photo} alt={`Foto de ${item.name}`} width={48} height={48} />}<strong>{item.name}</strong></div></article>)}
    </div></div></section>;
}
