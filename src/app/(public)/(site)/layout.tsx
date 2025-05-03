import '@/app/globals.css';
import { Toaster } from '@/components/shadcn/sonner';
import type { Metadata } from 'next';
import FAQ from '../_components/layout/faq';
import Footer from '../_components/layout/footer';
import FooterContact from '../_components/layout/footer-contact';
import Navbar from '../_components/layout/navbar';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Levia',
  description: 'Giải pháp cho căn bếp hiện đại',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo/logo-black.svg',
        href: '/logo/logo-black.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo/logo-white.svg',
        href: '/logo/logo-white.svg',
      },
    ],
  },
};

const shImogenAgnes = localFont({
  variable: '--font-sh-imogen-agnes',
  src: 'ShImogenAgnes.woff',
});

const monorale = localFont({
  variable: '--font-monorale',
  src: [
    {
      path: 'Monorale-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: 'Monorale-ThinItalic.woff',
      weight: '100',
      style: 'italic',
    },
    {
      path: 'Monorale-ExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: 'Monorale-ExtraLightItalic.woff',
      weight: '200',
      style: 'italic',
    },
    {
      path: 'Monorale-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'Monorale-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'Monorale-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'Monorale-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'Monorale-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'Monorale-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'Monorale-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'Monorale-SemiBoldItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: 'Monorale-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'Monorale-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
    {
      path: 'Monorale-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: 'Monorale-ExtraBoldItalic.woff',
      weight: '800',
      style: 'italic',
    },
    {
      path: 'Monorale-Black.woff',
      weight: '900',
      style: 'normal',
    },
    {
      path: 'Monorale-BlackItalic.woff',
      weight: '900',
      style: 'italic',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`mx-auto max-w-screen-xl antialised dark ${shImogenAgnes.variable} ${monorale.variable}`}
      >
        <Navbar />
        {children}
        <aside className="gap-6 md:gap-16 grid grid-cols-1 md:grid-cols-2 p-6 md:p-16">
          <FooterContact />
          <FAQ />
        </aside>
        <Footer />
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'flex items-center gap-4 px-6 py-4 w-full bg-secondary shadow-lg rounded-sm',
              description: 'group-[.toast]:text-muted-foreground',
              actionButton:
                'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
              cancelButton:
                'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
            },
          }}
        />
      </body>
    </html>
  );
}
