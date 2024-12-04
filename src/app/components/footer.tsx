import Link from 'next/link';

export default function Footer() {
  const links = [
    {
      icon: 'f',
      text: 'fanpage/levia.com',
      url: '#',
    },
    {
      icon: 'z',
      text: '0336 036 468',
      url: '#',
    },
    {
      icon: 'p',
      text: '0336 036 468',
      url: '#',
    },
  ];

  return (
    <footer>
      <ul className="flex justify-center items-center gap-4 p-4">
        <li>Levia &copy; 2024</li>
        {links.map((link, index) => (
          <li key={index} className="">
            <Link href={link.url}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
