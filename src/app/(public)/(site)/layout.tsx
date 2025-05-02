import type { Metadata } from 'next';
import '@/app/globals.css';
import Navbar from '../_components/layout/navbar';
import FAQ from '../_components/layout/faq';
import Footer from '../_components/layout/footer';
import { Toaster } from '@/components/shadcn/sonner';
import FooterContact from '../_components/layout/footer-contact';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-screen-xl antialised dark">
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
