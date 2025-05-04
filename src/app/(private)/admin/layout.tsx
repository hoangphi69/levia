import { SideNavbar } from '@/app/(private)/admin/_components/layout/side-navbar';
import ThemeProvider from '@/app/(private)/admin/_components/theme/theme-provider';
import '@/app/globals.css';
import { SidebarProvider } from '@/components/shadcn/sidebar';
import { monorale } from '@/fonts';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Levia Admin',
  description: 'Levia Admin quản lý nội dung',
  // TODO: Create universal favicon to avoid dynamic theme
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
      <body className={`antialised ${monorale.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <SideNavbar />
            <main className="w-full">{children}</main>
            <Toaster richColors />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
