import { renderToString } from 'react-dom/server';

import { Root } from '@/Root';
import { findRoute } from '@/routes';

export { routes } from '@/routes';

/** Used at build time by scripts/prerender.mjs */
export async function render(path: string): Promise<string> {
  const { default: Page } = await findRoute(path).load();
  return renderToString(<Root page={Page} />);
}
