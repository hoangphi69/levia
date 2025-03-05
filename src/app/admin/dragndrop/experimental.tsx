'use client';

import SmoothImage from '@/components/wrapper/smooth-image';
import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import {
  Check,
  GripVertical,
  LoaderCircle,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { Reorder, useDragControls } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { removeUploadedImage, saveImageOrder, uploadImages } from './page';

interface FileMap {
  blob: string;
  file: File;
}

export default function Experimental({
  initialItems,
}: {
  initialItems: string[];
}) {
  const [items, setItems] = useState(initialItems);
  const [savedItems, setSavedItems] = useState(initialItems);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newFileMap, setNewFileMap] = useState<FileMap[]>([]);

  useEffect(() => {
    setIsChanged(JSON.stringify(items) !== JSON.stringify(savedItems));
  }, [items, savedItems]);

  const handleSave = async () => {
    setIsLoading(true);

    let updatedItems = [...items];

    // Add new images
    const blobs = items.filter((item) => item.startsWith('blob:'));
    const files = blobs
      .map((blob) => newFileMap.find((fileMap) => fileMap.blob === blob)?.file)
      .filter((file) => file !== undefined);
    if (files.length > 0) {
      const response = await uploadImages(files);
      const urls = response
        .map((res) => res.data?.ufsUrl)
        .filter((url) => url !== undefined);

      updatedItems = items.map((item) => {
        if (item.startsWith('blob:')) {
          const index = blobs.indexOf(item);
          return urls[index] || item;
        }
        return item;
      });
    }

    // Remove images
    // https://<app-id>.ufs.sh/f/<file-key>
    // Remove images (on the cloud if it's not in updatedItems)
    const removedFileKeys = savedItems
      .filter((item) => !updatedItems.includes(item))
      .map((url) => url.split('/').slice(-1)[0]);
    if (removedFileKeys.length > 0) {
      await removeUploadedImage(removedFileKeys);
    }

    // Save images
    await saveImageOrder(updatedItems);

    setItems(updatedItems);
    setSavedItems(updatedItems);
    setIsChanged(false);
    setIsLoading(false);
    toast.success('Đã lưu thay đổi');
  };

  const resetItems = () => {
    setItems(initialItems);
    setIsChanged(false);
  };

  const removeItem = (itemToRemove: string) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-end gap-4">
        <div className="flex-1">
          <CardTitle>
            <h2 className="font-bold text-xl">Hình ảnh</h2>
          </CardTitle>
          <CardDescription>Sản phẩm cần tối thiểu 4 hình ảnh</CardDescription>
        </div>
        {isChanged && (
          <div className="flex flex-row gap-4">
            {!isLoading && (
              <Button variant={'outline'} onClick={resetItems}>
                <RotateCcw />
                <span>Đặt lại</span>
              </Button>
            )}
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  <span>Đang lưu</span>
                </>
              ) : (
                <>
                  <Check />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-xl overflow-x-auto no-scrollbar">
          <Reorder.Group
            axis="x"
            values={items}
            onReorder={setItems}
            layoutScroll
            className="relative flex *:flex-[0_0_20%] gap-4"
          >
            {items.map((item, index) => (
              <Item
                key={item}
                index={index}
                item={item}
                onRemove={removeItem}
              />
            ))}

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
                  const fileMap = { blob, file: event.target.files[0] };
                  setItems([...items, blob]);
                  setNewFileMap([...newFileMap, fileMap]);
                }}
              />
            </label>
          </Reorder.Group>
        </div>
      </CardContent>
    </Card>
  );
}

function Item({
  item,
  index,
  onRemove,
}: {
  item: string;
  index: number;
  onRemove: (item: string) => void;
}) {
  const controls = useDragControls();

  return (
    <div
      data-index={index + 1}
      className="before:top-1/2 before:left-1/2 before:absolute relative before:content-center before:text-border border-2 border-dashed rounded-xl before:font-mono before:text-7xl before:content-[attr(data-index)] before:-translate-x-1/2 before:-translate-y-1/2"
    >
      <Reorder.Item
        value={item}
        dragListener={false}
        dragControls={controls}
        className="group relative h-[300px] select-none"
      >
        <SmoothImage
          src={item}
          width={640}
          height={400}
          alt=""
          className="rounded-xl size-full pointer-events-none"
        />

        <div className="top-0 right-0 absolute flex flex-col gap-2 opacity-0 group-hover:opacity-100 p-2 transition-opacity">
          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <Button
                variant={'outline'}
                size={'icon'}
                className="cursor-grab"
                onPointerDown={(e) => controls.start(e)}
              >
                <span className="sr-only">Đổi thứ tự</span>
                <GripVertical />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Di chuyển</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => onRemove(item)}
              >
                <span className="sr-only">Xoá ảnh</span>
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Xoá ảnh</TooltipContent>
          </Tooltip>
        </div>
      </Reorder.Item>
    </div>
  );
}
