'use client';

import { Style } from '@prisma/client';

export default function StylePreview({ style }: { style: Style }) {
  return (
    <div className="relative mt-2 p-6 border rounded-md h-full">
      {(() => {
        switch (style) {
          case 'image_left':
            return (
              <div className="gap-4 grid grid-cols-2 size-full">
                <div className="bg-border rounded-ss-3xl"></div>
                <div className="flex flex-col self-center gap-4">
                  <div className="bg-border w-2/3 h-4"></div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-border w-full h-2"></div>
                    <div className="bg-border w-full h-2"></div>
                    <div className="bg-border w-1/3 h-2"></div>
                  </div>
                </div>
              </div>
            );
          case 'image_right':
            return (
              <div className="gap-4 grid grid-cols-2 size-full">
                <div className="flex flex-col self-center gap-4">
                  <div className="bg-border w-2/3 h-4"></div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-border w-full h-2"></div>
                    <div className="bg-border w-full h-2"></div>
                    <div className="bg-border w-1/3 h-2"></div>
                  </div>
                </div>
                <div className="bg-border rounded-ss-3xl"></div>
              </div>
            );
          case 'image_bottom':
            return (
              <div className="flex flex-col gap-4 size-full">
                <div className="self-center bg-border w-1/4 h-4"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-border w-1/2 h-2"></div>
                  <div className="bg-border w-1/3 h-2"></div>
                </div>
                <div className="flex-1 bg-border rounded-ss-3xl"></div>
              </div>
            );
          case 'image_only':
            return <div className="bg-border rounded-ss-3xl size-full"></div>;
          default:
            return;
        }
      })()}
    </div>
  );
}
