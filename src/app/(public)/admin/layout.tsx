import ThemeProvider from '@/app/(private)/admin/_components/theme/theme-provider';
import '@/app/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { shImogenAgnes } from '@/fonts';

const monorale = localFont({
  variable: '--font-monorale',
  src: [
    {
      path: '../../../fonts/Monorale-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-ThinItalic.woff',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../../fonts/Monorale-ExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-ExtraLightItalic.woff',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../../fonts/Monorale-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../fonts/Monorale-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../fonts/Monorale-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../fonts/Monorale-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-SemiBoldItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../../fonts/Monorale-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../../fonts/Monorale-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-ExtraBoldItalic.woff',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../../fonts/Monorale-Black.woff',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../../fonts/Monorale-BlackItalic.woff',
      weight: '900',
      style: 'italic',
    },
  ],
});

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
      <body className="mx-auto max-w-screen-xl antialised">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
