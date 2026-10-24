import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/combo-natal-lucrativo', '/cursos', '/contato', '/politica-de-privacidade', '/termos-de-uso'].map(route => ({ url: siteUrl(route) }));
}
