export const BASE_PATH = '/natallucrativo';
export const PUBLIC_ORIGIN = new URL(process.env.SITE_URL || 'https://www.confeitarialucrativaoficial.com').origin;

/** Prefix local public assets exactly once. next/link already adds the prefix. */
export function assetPath(path) {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('O recurso deve usar um caminho local absoluto.');
  return path === BASE_PATH || path.startsWith(`${BASE_PATH}/`) ? path : `${BASE_PATH}${path}`;
}

export function publicUrl(path = '') {
  return new URL(path ? assetPath(path) : BASE_PATH, PUBLIC_ORIGIN).href;
}
