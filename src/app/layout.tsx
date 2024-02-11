import '@/assets/styles/globals.css';
import 'nprogress/nprogress.css';

import inter from '@/assets/fonts/inter';
import LayoutClient from '@/components/parts/LayoutClient';
import Providers from '@/components/parts/Providers';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata();

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>
          {children}
          <LayoutClient />
        </Providers>
      </body>
    </html>
  );
}
