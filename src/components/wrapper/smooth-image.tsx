'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

type ImageWrapperProps = Omit<ImageProps, 'src'> & {
  src?: string;
  fallback?: string; // Optionally allow custom fallback images
};

export default function SmoothImage({
  src = '/images/placeholder.png',
  alt,
  className,
  fallback = '/images/placeholder.png',
  ...props
}: ImageWrapperProps) {
  const [source, setSource] = useState(src);

  useEffect(() => setSource(src), [src]);

  return (
    <Image
      {...props}
      src={source}
      alt={alt}
      className={`object-cover opacity-0 transition-opacity ${className}`}
      onLoad={(e) => e.currentTarget.classList.remove('opacity-0')} // Display image smoothly after loading completely
      onError={() => setSource(fallback)} // Switch to fallback image on error
    />
  );
}
