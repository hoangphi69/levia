'use client';

import {
  removeUploadedImage,
  uploadFiles,
} from '@/app/lib/actions/uploadthing';
import { FileMap } from '@/app/lib/types';
import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Check, LoaderCircle, Plus, RotateCcw } from 'lucide-react';
import { Reorder } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ImageItem from './image-item';

export default function ImageListEdit({
  title,
  description,
  initialImages,
  updateImagesAction,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  initialImages: string[];
  updateImagesAction: (images: string[]) => Promise<void>;
}) {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(initialImages);
  const [savedImages, setSavedImages] = useState(initialImages);
  const [newFileMap, setNewFileMap] = useState<FileMap[]>([]);

  useEffect(() => {
    setIsChanged(JSON.stringify(images) !== JSON.stringify(savedImages));
  }, [images, savedImages]);

  const handleSave = async () => {
    try {
      setIsLoading(true);

      let updatedImages = [...images];

      // Add new images
      // Get blobs -> get files -> upload files -> get urls -> replace blobs with urls
      const blobs = images.filter((image) => image.startsWith('blob:'));
      const files = blobs
        .map(
          (blob) => newFileMap.find((fileMap) => fileMap.blob === blob)?.file
        )
        .filter((file) => file !== undefined);
      if (files.length > 0) {
        const response = await uploadFiles(files);
        const urls = response
          .map((res) => res.data?.ufsUrl)
          .filter((url) => url !== undefined);

        updatedImages = images.map((image) => {
          if (image.startsWith('blob:')) {
            const index = blobs.indexOf(image);
            return urls[index] || image;
          }
          return image;
        });
      }

      // Remove images
      // https://<app-id>.ufs.sh/f/<file-key>
      // Remove images (on the cloud if it's not in updatedItems)
      const removedFileKeys = savedImages
        .filter((image) => !updatedImages.includes(image))
        .map((url) => url.split('/').slice(-1)[0]);
      if (removedFileKeys.length > 0) {
        await removeUploadedImage(removedFileKeys);
      }

      // Save images
      await updateImagesAction(updatedImages);

      setImages(updatedImages);
      setSavedImages(updatedImages);
      setIsChanged(false);
      setIsLoading(false);

      toast.success('Đã lưu thay đổi.');
    } catch (error) {
      console.error(`Image list edit: ${error}`);
      toast.error('Cập nhật hình ảnh không thành công.');
    }
  };

  const resetImages = () => {
    setImages(initialImages);
    setIsChanged(false);
  };

  const removeImage = (imageToRemove: string) => {
    setImages(images.filter((image) => image !== imageToRemove));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-end gap-4">
        <div className="flex-1">
          <CardTitle>
            <h2 className="font-bold text-xl">{title}</h2>
          </CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
        {isChanged && (
          <div className="flex flex-row gap-4">
            {!isLoading && (
              <Button variant={'outline'} onClick={resetImages}>
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
            values={images}
            onReorder={setImages}
            layoutScroll
            className="relative flex *:flex-[0_0_20%] gap-4"
          >
            {images.map((item, index) => (
              <ImageItem
                key={item}
                index={index}
                image={item}
                onRemove={removeImage}
              />
            ))}

            <label className="group place-items-center grid p-4 border-2 hover:border-muted-foreground border-dashed rounded-xl h-[300px] transition-colors cursor-pointer">
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
                  setImages([...images, blob]);
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
