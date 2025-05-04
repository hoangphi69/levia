'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

type ImageWrapperProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
  fallback?: string;
};

// 'src' when value is:
// - undefined: use default placeholder image
// - null: use default placeholder image
// - empty string: use default placeholder image
// - invalid URL: use the fallback image
// - valid URL: use the provided image URL

export default function SmoothImage({
  src,
  className,
  fallback = '/images/placeholder.png',
  ...props
}: ImageWrapperProps) {
  const [source, setSource] = useState(src);

  useEffect(() => setSource(src), [src]);

  return (
    <Image
      {...props}
      // Use fallback if source is null or undefined
      src={source || fallback}
      // Display image smoothly after loading completely
      className={`object-cover opacity-0 transition-opacity ${className}`}
      onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
      // Switch to fallback image on error
      onError={() => setSource(fallback)}
    />
  );
}
