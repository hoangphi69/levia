'use client';

import SmoothImage from '@/app/components/smooth-image';
import Zoom from '@/app/components/zoom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { GripVertical, Plus, RefreshCcw, Trash2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Swapy, createSwapy } from 'swapy';
import UploadDropZone from './upload-drop-zone';
import { AddProductImage } from '@/app/lib/actions';
import { toast } from 'sonner';
import { revalidatePath } from 'next/cache';
import { usePathname } from 'next/navigation';

export default function SwapyImageZone({
  productId,
  images,
}: {
  productId: string;
  images: string[] | undefined;
}) {
  const pathname = usePathname();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swapy: Swapy;
    if (container.current) {
      swapy = createSwapy(container.current, { animation: 'dynamic' });
    }

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <div ref={container} className="gap-4 grid grid-cols-2">
      {images?.map((image, index) => (
        <div
          data-swapy-slot={index}
          key={index}
          className={`relative rounded-xl border border-dashed before:absolute before:inset-0 before:content-center before:text-center before:content-[attr(data-swapy-slot)] before:font-mono before:text-7xl before:opacity-50`}
        >
          <div data-swapy-item={index} className="group relative h-[300px]">
            <Zoom>
              <SmoothImage
                src={image}
                width={640}
                height={400}
                alt=""
                className="absolute rounded-xl size-full"
              />
            </Zoom>

            <div className="top-0 right-0 absolute flex flex-col gap-2 opacity-0 group-hover:opacity-100 p-2 transition-opacity">
              <Tooltip delayDuration={700}>
                <TooltipTrigger asChild>
                  <Button data-swapy-handle variant={'outline'} size={'icon'}>
                    <span className="sr-only">Đổi thứ tự</span>
                    <GripVertical />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Di chuyển</TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={700}>
                <TooltipTrigger asChild>
                  <Button variant={'outline'} size={'icon'}>
                    <span className="sr-only">Đổi ảnh</span>
                    <RefreshCcw />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Di chuyển</TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={700}>
                <TooltipTrigger asChild>
                  <Button variant={'outline'} size={'icon'}>
                    <span className="sr-only">Xoá ảnh</span>
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Di chuyển</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus></Plus>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Upload ảnh</DialogTitle>
          <UploadDropZone
            endpoint={'imageUploader'}
            onClientUploadComplete={async (res) => {
              const url = res[0].ufsUrl;
              const { result, error } = await AddProductImage({
                id: productId,
                url,
              });
              if (error) {
                toast.error('Upload file không thành công');
                console.log(error);
              } else {
                toast.success('Upload file thành công');
                console.log(result);
              }
            }}
            onUploadError={(error: Error) => {
              toast.error('Upload file không thành công', {
                description: `Error: ${error}`,
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
