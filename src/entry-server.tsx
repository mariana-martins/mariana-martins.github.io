import { renderToString } from 'react-dom/server';

import { Root } from '@/Root';

/** Used at build time by scripts/prerender.mjs */
export function render(): string {
  return renderToString(<Root />);
}
