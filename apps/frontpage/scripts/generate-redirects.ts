import path from 'node:path';
import { readFile, writeFile } from 'fs-extra';
import { generateRedirects } from '../lib/generateRedirects/generate-redirects';

async function generate(): Promise<void> {
  const staticRedirects = await readFile(
    path.join(__dirname, '..', 'lib/generateRedirects', 'static-redirects'),
    'utf-8',
  );

  const rawRedirects = await readFile(
    path.join(__dirname, '..', 'lib/generateRedirects', 'raw-redirects'),
    'utf-8',
  );
  const redirects = generateRedirects({ rawRedirects });

  const formattedRedirects = redirects.map(([from, to, status]) => `${from} ${to} ${status}`).join('\n');

  const finalRedirects = `${staticRedirects}\n\n# Generated redirects\n${formattedRedirects}`;

  await writeFile(
    path.join(__dirname, '..', 'public', '_redirects'),
    finalRedirects,
  );
}

void (async () => {
  await generate();
})();
