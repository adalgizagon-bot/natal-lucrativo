import { BASE_PATH, assetPath } from './routing.mjs';
export { BASE_PATH };
// Preserva a API da main (raiz vazia e rotas relativas), usando a fonte única.
export function withBasePath(route = '') {
  if (!route) return BASE_PATH;
  return assetPath(route.startsWith('/') ? route : `/${route}`);
}
