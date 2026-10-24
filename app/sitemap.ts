import type { MetadataRoute } from 'next';
export default function sitemap():MetadataRoute.Sitemap {const base=process.env.SITE_URL?.replace(/\/$/,'');return base?['','/combo-natal-lucrativo','/cursos','/contato','/politica-de-privacidade','/termos-de-uso'].map(route=>({url:`${base}${route}`})):[];}
