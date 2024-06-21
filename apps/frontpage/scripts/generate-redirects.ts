import path from 'node:path';
import fs from 'fs-extra';

import { generateRedirects } from '../lib/generateRedirects/generateRedirects';

async function generate(): Promise<void> {
  const rawRedirects = await fs.readFile(
    path.join(__dirname, 'raw-redirects'),
    'utf-8',
  );
  const redirects = await generateRedirects({ rawRedirects });

  await fs.writeFile(
    path.join(__dirname, '..', 'generated-redirects.json'),
    JSON.stringify(redirects, null, 2),
  );
}

void (async () => {
  await generate();
})();
