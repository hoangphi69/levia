import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/navigation';
import FAQ from './components/faq';
import Footer from './components/footer';

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
      <body className={`antialiased font-modern`}>
        <Navigation />
        {children}
        <FAQ />
        <Footer />
      </body>
    </html>
  );
}
