import Image from 'next/image';
import { materials } from '@/lib/config';
import { materialImage } from '@/lib/images';
export function Catalog(){return <div className="catalog">{materials.map(item=>{const image=materialImage(item.number);return <article className="material" key={item.number}>{image&&<div className="cover"><Image src={image} alt={`Capa de ${item.title}`} fill sizes="(max-width: 680px) 90vw, 30vw" className="object-contain"/></div>}<div className="card-top"><span className="material-number">{item.number}</span><span className="eyebrow">{item.category}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="format">E-BOOK DIGITAL</span></article>})}</div>}
