'use client';

import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function DoubleClickLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const router = useRouter();

  const handleDoubleClick = () => {
    router.push(href);
  };

  return (
    <span
      onClick={(e) => e.preventDefault()} // Prevent single click action
      onDoubleClick={handleDoubleClick}
      style={{ cursor: 'pointer', color: 'blue' }}
    >
      {children}
    </span>
  );
}
