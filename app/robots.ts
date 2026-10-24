import type { MetadataRoute } from 'next';
import { BASE_PATH } from '@/lib/paths';
import { siteUrl } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: `${BASE_PATH}/` }, sitemap: siteUrl('/sitemap.xml') };
}
