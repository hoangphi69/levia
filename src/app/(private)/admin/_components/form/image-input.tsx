'use client';

import { Button } from '@/components/shadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import SmoothImage from '@/components/wrapper/smooth-image';
import Zoom from '@/components/wrapper/zoom';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ImageInput({
  value,
  onChange,
  updateFileMap,
}: {
  value: string | null;
  onChange: (blob: string) => void;
  updateFileMap: (blob: string, file: File) => void;
}) {
  const [image, setImage] = useState(value);

  useEffect(() => {
    setImage(value);
  }, [value]);

  return (
    <>
      {!image && (
        <label className="group place-items-center grid p-4 border-2 border-dashed rounded-xl cursor-pointer">
          <Plus className="group-hover:text-muted-foreground text-border size-16 transition-colors" />
          <span className="sr-only">Thêm ảnh</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              if (!event.target.files) return;
              const blob = URL.createObjectURL(event.target.files[0]);
              setImage(blob);
              onChange(blob);
              updateFileMap(blob, event.target.files[0]);
            }}
          />
        </label>
      )}

      {image && (
        <div className="group relative border-2 border-dashed rounded-xl w-full max-h-[300px] overflow-hidden">
          <Zoom>
            <SmoothImage
              src={image}
              width={600}
              height={600}
              alt=""
              className="w-full h-[300px]"
            />
          </Zoom>

          <div className="top-0 right-0 absolute flex flex-col gap-2 opacity-0 group-hover:opacity-100 p-2 transition-opacity">
            <Tooltip delayDuration={700}>
              <TooltipTrigger asChild>
                <Button
                  variant={'outline'}
                  size={'icon'}
                  onClick={() => {
                    onChange('');
                    setImage(null);
                  }}
                >
                  <span className="sr-only">Xoá ảnh</span>
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Xoá ảnh</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
}
