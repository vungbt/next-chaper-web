import BaseInit from '@/libraries/base-init';
import TopLoader from '@/libraries/top-loader';
import { ELocale, getDictionary } from '@/utils/dictionaries';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default async function RootLayout({
  children,
  params,
  admin,
  customer
}: Readonly<{
  children: React.ReactNode;
  params: { locale: ELocale };
  admin: ReactNode;
  customer: ReactNode;
}>) {
  const messages = await getDictionary(params.locale);
  const renderNode = true ? admin : customer;
  return (
    <html lang={params.locale} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon-dev.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <BaseInit />
          <main>{renderNode}</main>
          <TopLoader />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
