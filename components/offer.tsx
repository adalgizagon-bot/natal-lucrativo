import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { commerce, money, discount } from '@/lib/config';
export function Offer({compact=false}:{compact?:boolean}) {
 return <div className={compact?'offer compact':'offer'}><span className="eyebrow">OFERTA ESPECIAL!</span>{commerce.referencePriceConfirmed&&<><p className="old-price">DE <s>{money(commerce.referencePrice)}</s></p></>}<p className="price"><span>POR APENAS</span> {money(commerce.price)}<span className="price-bang">!</span></p>{commerce.referencePriceConfirmed&&<p className="saving">ECONOMIZE APROXIMADAMENTE {discount(commerce.price,commerce.referencePrice)}%!</p>}<a className="buy-button" href={commerce.checkout} target="_blank" rel="noopener noreferrer">QUERO MEUS 7 E-BOOKS DE NATAL! <ArrowUpRight size={21}/></a><p className="secure"><LockKeyhole size={13}/> Compra pelo checkout da Hotmart · 7 e-books</p></div>;
}
