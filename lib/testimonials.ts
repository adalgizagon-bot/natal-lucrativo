export type Testimonial = {
  id: string;
  name: string;
  text: string;
  /** Somente caminhos locais de fotos autorizadas em public/. */
  photo?: string;
  /** Preencher somente quando a nota fizer parte da avaliação real. */
  rating?: 1 | 2 | 3 | 4 | 5;
};
// Inserir apenas relatos reais, autorizados e pertinentes a este produto.
export const testimonials: Testimonial[] = [];
export function visibleTestimonials(production: boolean): { items: Testimonial[]; examples: boolean } {
  if (testimonials.length) return { items: testimonials, examples: false };
  if (production) return { items: [], examples: false };
  return { examples: true, items: [1, 2, 3].map(n => ({
    id: `example-${n}`, name: `Exemplo de layout ${n} — não é uma aluna`,
    text: 'Espaço reservado para um depoimento real autorizado. Este texto demonstra o layout e não relata uma experiência de compra.',
  })) };
}
