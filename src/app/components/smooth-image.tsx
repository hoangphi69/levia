'use client';

import Image, { ImageProps } from 'next/image';
import placholder from '../../../public/images/placeholder.png'; // Adjust the path to your fallback image
import { useState } from 'react';

type ImageWrapperProps = ImageProps & {
  fallback?: string; // Optionally allow custom fallback images
};

const SmoothImage: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  className,
  fallback = placholder,
  ...props
}) => {
  const [source, setSource] = useState(src);

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
};

export default SmoothImage;
