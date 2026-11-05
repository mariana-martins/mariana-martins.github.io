import { test as base } from '@playwright/test';

export { expect } from '@playwright/test';

export const ANALYTICS_HOST = 'gc.zgo.at';

/** Tests never reach the analytics server: no network dependency, no visits */
export const test = base.extend({
  context: async ({ context }, run) => {
    await context.route(`https://${ANALYTICS_HOST}/**`, (route) =>
      route.abort(),
    );
    await run(context);
  },
});
