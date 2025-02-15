'use client';

import SmoothImage from '@/app/components/smooth-image';
import Zoom from '@/app/components/zoom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { GripVertical, RefreshCcw, Trash2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import Header from '../components/header';
import { createSwapy, Swapy } from 'swapy';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UploadDropzone } from '@/app/lib/uploadthing';

export default function Test() {
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

  const images = [
    'https://picsum.photos/1280/900',
    'https://picsum.photos/1280/800',
    'https://picsum.photos/1280/700',
    'https://picsum.photos/1260/900',
    'https://picsum.photos/1250/900',
  ];

  const header = {
    title: 'Test drag n drop',
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/admin',
      },
      {
        display: 'Drag n drop',
      },
    ],
  };

  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />

      <section className="gap-4 grid grid-cols-1 mx-auto p-4 container">
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="font-bold text-xl">Hình ảnh</h2>
            </CardTitle>
            <CardDescription>Sản phẩm cần tối thiểu 4 hình ảnh</CardDescription>
          </CardHeader>
          <CardContent ref={container} className="gap-4 grid grid-cols-2">
            {images.map((image, index) => (
              <div
                data-swapy-slot={index}
                key={index}
                className={`relative rounded-xl border border-dashed before:absolute before:inset-0 before:content-center before:text-center before:content-[attr(data-swapy-slot)] before:font-mono before:text-7xl before:opacity-50`}
              >
                <div
                  data-swapy-item={index}
                  className="group relative h-[300px]"
                >
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
                        <Button
                          data-swapy-handle
                          variant={'outline'}
                          size={'icon'}
                        >
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
          </CardContent>
        </Card>
      </section>
    </>
  );
}
