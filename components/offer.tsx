import { ArrowUpRight, Gift, LockKeyhole, Sparkles } from 'lucide-react';
import { commerce, money, discount } from '@/lib/config';

export function Offer({ compact = false, final = false }: { compact?: boolean; final?: boolean }) {
  return (
    <div className={compact ? 'offer compact' : 'offer'}>
      <span className="offer-heading"><Sparkles size={16} aria-hidden="true" /> PROMOÇÃO ESPECIAL DE NATAL</span>
      {commerce.referencePriceConfirmed && <p className="old-price">DE <s>{money(commerce.referencePrice)}</s></p>}
      <p className="price"><span>POR APENAS</span>{money(commerce.price)}</p>
      {commerce.referencePriceConfirmed && <p className="saving">ECONOMIZE {money(commerce.referencePrice - commerce.price)}<span>APROXIMADAMENTE {discount(commerce.price, commerce.referencePrice)}% DE DESCONTO!</span></p>}
      <a className="buy-button" href={commerce.checkout} target="_blank" rel="noopener noreferrer">
        <Gift size={21} aria-hidden="true" />
        <span>{compact ? 'QUERO MEU COMBO!' : final ? 'QUERO MEUS 7 E-BOOKS COM DESCONTO!' : 'SIM! QUERO APROVEITAR A OFERTA DE NATAL!'}</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </a>
      <p className="secure"><LockKeyhole size={13} aria-hidden="true" /> Checkout Hotmart · Combo com 7 e-books digitais</p>
    </div>
  );
}
