import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/navigation';
import FAQ from './components/faq';
import Footer from './components/footer';
import { Toaster } from '@/components/ui/sonner';
import FooterContact from './components/footer-contact';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-screen-xl antialised dark">
        <Navigation />
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
