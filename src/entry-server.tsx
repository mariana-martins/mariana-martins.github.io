import { renderToString } from 'react-dom/server';

import { Root } from '@/Root';
import type { Route } from '@/routes';

export { prerenderedRoutes as routes } from '@/routes';

export async function render(route: Route): Promise<string> {
  const { default: Page } = await route.load();
  return renderToString(<Root page={Page} />);
}
