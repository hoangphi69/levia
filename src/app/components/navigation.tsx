import Link from 'next/link';

export default function Navigation() {
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

  return (
    <nav className="top-0 z-10 sticky flex justify-between items-center gap-8 bg-dark-1/20 backdrop-blur-xl backdrop-saturate-150 md:px-16 isolate">
      <Link href="/">
        <img
          src={'/logo/logo-text.svg'}
          alt="Levia logo"
          className="block md:m-0 ml-5 max-w-20 object-contain"
        />
      </Link>

      <ul className="md:flex items-center hidden">
        {links.map((link, index) => (
          <Link
            className="px-4 py-4 font-bold text-light-1 text-nowrap text-sm hover:underline decoration-2 decoration-accent-2 fill-light-1"
            key={index}
            href={link.route}
          >
            {link.displayName}
          </Link>
        ))}
      </ul>

      <Link href="/contacts" className="text-nowrap text-sm btn">
        Liên hệ
      </Link>
    </nav>
  );
}
