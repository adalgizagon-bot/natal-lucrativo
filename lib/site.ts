import { withBasePath } from './paths.ts';
export const SITE_ORIGIN = new URL(process.env.SITE_URL || 'https://www.confeitarialucrativaoficial.com').origin;
export const siteUrl = (route = '') => new URL(withBasePath(route), SITE_ORIGIN).toString();
