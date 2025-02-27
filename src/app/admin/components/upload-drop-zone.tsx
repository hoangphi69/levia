'use client';

import { UploadDropzone } from '@/app/lib/uploadthing';
import { UploadCloud } from 'lucide-react';
import React from 'react';

export default function UploadDropZone({
  ...props
}: React.ComponentProps<typeof UploadDropzone>) {
  return (
    <UploadDropzone
      className="border !border-border border-dashed ut-label:font-medium ut-button:font-semibold ut-allowed-content:text-muted-foreground ut-button:text-background ut-label:text-muted-foreground hover:ut-button:bg-accent-gold/80 ut-button:bg-accent-gold cursor-pointer"
      content={{
        label: ' ',
        allowedContent: ' ',
        uploadIcon: <UploadCloud size={50} className="text-muted-foreground" />,
      }}
      {...props}
    />
  );
}
