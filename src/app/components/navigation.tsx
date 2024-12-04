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
    <nav className="flex justify-center items-center gap-4 p-4">
      {links.map((link, index) => (
        <Link key={index} href={link.route}>
          {link.displayName}
        </Link>
      ))}
    </nav>
  );
}
