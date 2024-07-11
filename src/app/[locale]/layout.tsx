import TopLoader from '@/libraries/top-loader';
import { ELocale, getDictionary } from '@/utils/dictionaries';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'react-hot-toast';

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: ELocale };
}>) {
  const messages = await getDictionary(params.locale);
  return (
    <html lang={params.locale} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon-dev.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <main>{children}</main>
          <TopLoader />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
