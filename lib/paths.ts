/** Prefixo fixo de publicação; o Next também o usa no build. */
export const BASE_PATH = '/natallucrativo';
export function withBasePath(route = '') {
  if (route === BASE_PATH || route.startsWith(`${BASE_PATH}/`)) return route;
  return `${BASE_PATH}${route ? (route.startsWith('/') ? route : `/${route}`) : ''}`;
}
