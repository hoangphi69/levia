'use client';

import { uploadFiles } from '@/app/lib/actions/uploadthing';
import { FileMap } from '@/app/lib/types';
import { generateUUID } from '@/app/lib/utils/generators';
import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { ProductMedia, Style } from '@prisma/client';
import { Check, LoaderCircle, Plus, RotateCcw } from 'lucide-react';
import { Reorder } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductMediaItem from './product-media-item';

export default function ProductMediaEdit({
  title,
  description,
  initialMedia,
  updateMediaAction,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  initialMedia: ProductMedia[];
  updateMediaAction: (media: ProductMedia[]) => Promise<{
    success: boolean;
    message: string;
  }>;
}) {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState(initialMedia);
  const [savedMedia, setSavedMedia] = useState(initialMedia);
  const [fileMap, setFileMap] = useState<FileMap[]>([]);

  useEffect(() => {
    setIsChanged(JSON.stringify(media) !== JSON.stringify(savedMedia));
  }, [media, savedMedia]);

  const createNewMedia = () => {
    // Generate temporary media id prefixed with 'temp:'
    const uuid = generateUUID();
    const newMedia: ProductMedia = {
      id: `temp:${uuid}`,
      product_id: '',
      title: '',
      subtitle: '',
      media_url: '',
      style: 'image_bottom',
    };
    setMedia([...media, newMedia]);
  };

  const deleteMedia = (id: string) => {
    setMedia((media) => media.filter((m) => m.id !== id));
  };

  const changeMediaTitle = (id: string, title: string) => {
    const newMedia = media.map((m) => ({ ...m }));
    newMedia.find((m) => m.id === id)!.title = title;
    setMedia(newMedia);
  };

  const changeMediaSubtitle = (id: string, subtitle: string) => {
    const newMedia = media.map((m) => ({ ...m }));
    newMedia.find((m) => m.id === id)!.subtitle = subtitle;
    setMedia(newMedia);
  };

  const changeMediaStyle = (id: string, style: Style) => {
    const newMedia = media.map((m) => ({ ...m }));
    newMedia.find((m) => m.id === id)!.style = style;
    setMedia(newMedia);
  };

  const changeMediaURL = (id: string, blob: string) => {
    const newMedia = media.map((m) => ({ ...m }));
    newMedia.find((m) => m.id === id)!.media_url = blob;
    setMedia(newMedia);
  };

  const updateFileMap = (blob: string, file: File) => {
    const newFileMap = { blob, file };
    setFileMap((fileMap) => [...fileMap, newFileMap]);
  };

  const resetToDefault = () => {
    setMedia(savedMedia);
    setIsChanged(false);
  };

  const replaceBlobsWithURLs = async () => {
    let updatedMedia = [...media];

    // Extract blob URLs from media_url
    const blobs = media
      .map((m) => m.media_url)
      .filter((url) => url.startsWith('blob:'));

    // Match blobs with files in fileMap
    const files = blobs
      .map((blob) => fileMap.find((map) => map.blob === blob)?.file)
      .filter((file) => file !== undefined);
    if (files.length > 0) {
      const response = await uploadFiles(files);

      // Extract URLs returned from the upload response
      const urls = response
        .map((res) => res.data?.ufsUrl)
        .filter((url) => url !== undefined);

      updatedMedia = media.map((m) => {
        if (m.media_url.startsWith('blob:')) {
          const index = blobs.indexOf(m.media_url);
          const newURL = urls[index] || m.media_url;
          return { ...m, media_url: newURL };
        }
        return m;
      });
    }

    return updatedMedia;
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const updatedMedia = await replaceBlobsWithURLs();
      const response = await updateMediaAction(updatedMedia);

      if (response.success) {
        toast.success('Đã lưu thay đổi.');
        setMedia(updatedMedia);
        setSavedMedia(updatedMedia);
        setIsChanged(false);
      } else {
        toast.error('Cập nhật không thành công.');
      }
    } catch (error) {
      console.log('Error saving data:', error);
      toast.error('Cập nhật không thành công.');
    } finally {
      setIsLoading(false);
    }
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
              <Button variant={'outline'} onClick={resetToDefault}>
                <RotateCcw />
                <span>Đặt lại</span>
              </Button>
            )}
            <Button disabled={isLoading} onClick={handleSave}>
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
        <Reorder.Group
          values={media}
          onReorder={setMedia}
          className="flex flex-col gap-6"
        >
          {media.map((m, index) => (
            <ProductMediaItem
              key={m.id}
              index={index}
              media={m}
              changeMediaURL={changeMediaURL.bind(null, m.id)}
              updateFileMap={updateFileMap}
              changeMediaStyle={changeMediaStyle.bind(null, m.id)}
              changeMediaTitle={changeMediaTitle.bind(null, m.id)}
              changeMediaSubtitle={changeMediaSubtitle.bind(null, m.id)}
              deleteMedia={deleteMedia.bind(null, m.id)}
            />
          ))}

          <label className="group place-items-center grid p-4 border-2 hover:border-muted-foreground border-dashed rounded-xl h-[300px] transition-colors cursor-pointer">
            <Plus className="group-hover:text-muted-foreground text-border size-16 transition-colors" />
            <Button className="sr-only" onClick={createNewMedia}>
              Thêm media
            </Button>
          </label>
        </Reorder.Group>
      </CardContent>
    </Card>
  );
}
