import { renderToString } from 'react-dom/server';

import { Root } from '@/Root';

/**
 * Renders the page to HTML at build time; scripts/prerender.mjs puts the
 * result into dist/index.html so crawlers, link previews and visitors
 * without JavaScript get the content, and the browser hydrates it.
 */
export function render(): string {
  return renderToString(<Root />);
}
