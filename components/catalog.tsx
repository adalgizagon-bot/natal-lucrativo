import Image from 'next/image';
import { BookOpen, Check } from 'lucide-react';
import { materials } from '@/lib/config';
import { materialImage } from '@/lib/images';

export function Catalog() {
  return <div className="catalog">{materials.map(item => {
    const image = materialImage(item.number);
    return <article className="material" key={item.number}>
      {image ? <div className="cover"><Image src={image} alt={`Capa de ${item.title}`} fill sizes="(max-width: 680px) 90vw, 30vw" className="object-contain" /></div> :
        <div className="cover-reserved"><BookOpen size={32} aria-hidden="true" /><span>Espaço para a capa oficial</span><small>Imagem ainda não fornecida</small></div>}
      <div className="material-body"><div className="card-top"><span className="material-number">{item.number}</span><span className="eyebrow">{item.category}</span></div>
        <h3>{item.title}</h3><p>{item.description}</p>
        <div className="material-benefit"><Check size={16} aria-hidden="true" /><span>{item.benefit}</span></div>
        <span className="format">MATERIAL DIGITAL · E-BOOK</span></div>
    </article>;
  })}</div>;
}
