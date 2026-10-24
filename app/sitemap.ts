import type { MetadataRoute } from 'next';
import { publicUrl } from '@/lib/routing.mjs';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/combo-natal-lucrativo', '/cursos', '/contato', '/politica-de-privacidade', '/termos-de-uso'].map(route => ({ url: publicUrl(route) }));
}
