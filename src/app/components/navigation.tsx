'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SmoothImage from './smooth-image';
import logo from '../../../public/logo/logo-text.svg';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export default function Navigation() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const links = [
    {
      route: '/',
      displayName: 'Trang chủ',
    },
    {
      route: '/about',
      displayName: 'Giới thiệu',
    },
    {
      route: '/products',
      displayName: 'Sản phẩm',
      dropdown: (
        <div className="*:inline-flex flex flex-col *:items-center *:gap-2 *:px-6 *:py-4 font-semibold text-muted-foreground whitespace-nowrap">
          <Link href={'/products/'}>
            Bếp điện từ{' '}
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
          <Link href={'/products/'}>Máy hút mùi</Link>
          <Link href={'/products/'}>Đồ gia dụng</Link>
        </div>
      ),
    },
    {
      route: '/articles',
      displayName: 'Bài viết',
    },
    {
      route: '/agencies',
      displayName: 'Đại lý',
    },
  ];

  return isDesktop ? (
    <nav className="top-0 z-50 sticky flex justify-between items-center gap-8 bg-secondary/20 hover:bg-secondary backdrop-blur-xl backdrop-saturate-150 px-16 transition-colors isolate">
      <Link href="/">
        <SmoothImage src={logo} alt="Levia logo" className="max-w-20" />
      </Link>

      <ul className="md:flex items-center hidden">
        {links.map((link, index) => (
          <li className="relative group" key={index}>
            {link.dropdown ? (
              // Link with dropdown
              <>
                <Link
                  className="inline-flex items-center gap-1 p-4 font-bold text-sm whitespace-nowrap"
                  href={link.route}
                >
                  <span className="group-hover:underline decoration-2 decoration-accent-gold">
                    {link.displayName}
                  </span>
                  <span className="group-hover:rotate-180 group-hover:text-accent-gold transition-transform material-symbols-outlined">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="group-hover:block top-full left-1/2 absolute hidden bg-secondary shadow-lg -translate-x-1/2">
                  {link.dropdown}
                </div>
              </>
            ) : (
              // Link without dropdown
              <Link
                className="p-4 font-bold text-sm hover:underline whitespace-nowrap decoration-2 decoration-accent-gold"
                href={link.route}
              >
                {link.displayName}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <Button
        className="bg-gradient-to-tr from-accent-gold to-accent-almond rounded-none font-bold"
        asChild
      >
        <Link href="/contacts">Liên hệ</Link>
      </Button>
    </nav>
  ) : (
    <nav className="top-0 z-50 sticky flex justify-between items-center gap-8 bg-secondary/20 hover:bg-secondary backdrop-blur-xl backdrop-saturate-150 px-6 py-2 transition-colors isolate">
      <Link href="/">
        <SmoothImage src={logo} alt="Levia logo" className="max-w-20" />
      </Link>

      <div className="flex items-center gap-6">
        <Button
          className="bg-gradient-to-tr from-accent-gold to-accent-almond rounded-none font-bold"
          asChild
        >
          <Link href="/contacts">Liên hệ</Link>
        </Button>
        <Sheet>
          <SheetTrigger className="content-center grid">
            <span className="material-symbols-outlined">menu</span>
          </SheetTrigger>
          <SheetContent className="p-0">
            <VisuallyHidden.Root>
              <SheetTitle>Menu</SheetTitle>
            </VisuallyHidden.Root>
            <ul className="">
              {links.map((link, index) => (
                <li className="hover:bg-secondary" key={index}>
                  <Link
                    className="flex px-6 py-4 font-semibold uppercase"
                    href={link.route}
                  >
                    {link.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
