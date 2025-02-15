import SmoothImage from '@/app/components/smooth-image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import React from 'react';

export default function Avatar({ src }: { src: string | StaticImport }) {
  return (
    <div className="inline bg-foreground rounded-full w-7 h-7 overflow-hidden shrink-0">
      <SmoothImage src={src} alt="User avatar" width={28} height={28} />
    </div>
  );
}
