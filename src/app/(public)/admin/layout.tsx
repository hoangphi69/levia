import ThemeProvider from '@/app/(private)/admin/_components/theme/theme-provider';
import '@/app/globals.css';
import { monorale } from '@/fonts';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập Levia Admin',
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`mx-auto max-w-screen-xl antialised ${monorale.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="w-full">{children}</main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
