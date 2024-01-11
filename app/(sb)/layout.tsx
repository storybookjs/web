import type { PropsWithChildren } from 'react';
import React from 'react';

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="page">
            <>{children}</>
          </div>
        </main>
      </body>
    </html>
  );
}
