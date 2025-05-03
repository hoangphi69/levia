'use client';

import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { uploadFiles } from '@/lib/actions/uploadthing';
import { FileMap } from '@/lib/definitions';
import { generateUUID } from '@/lib/utils/generators';
import { ProductReview } from '@prisma/client';
import { Check, LoaderCircle, Plus, RotateCcw } from 'lucide-react';
import { Reorder } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductReviewItem from './product-review-item';

export default function ProductReviewEdit({
  title,
  description,
  initialReviews,
  updateReviewsAction,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  initialReviews: ProductReview[];
  updateReviewsAction: (reviews: ProductReview[]) => Promise<{
    success: boolean;
    message: string;
  }>;
}) {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  const [savedReviews, setSavedReviews] = useState(initialReviews);
  const [fileMap, setFileMap] = useState<FileMap[]>([]);

  useEffect(() => {
    setIsChanged(JSON.stringify(reviews) !== JSON.stringify(savedReviews));
  }, [reviews, savedReviews]);

  const createNewReview = () => {
    // Generate temporary review id prefixed with 'temp:'
    const uuid = generateUUID();
    const newReview: ProductReview = {
      id: `temp:${uuid}`,
      product_id: '',
      updated_at: new Date(),

      image: '',
      author: '',
      comment: '',
      rating: 5,
      created_at: new Date(),
    };
    setReviews([...reviews, newReview]);
  };

  const deleteReview = (id: string) => {
    setReviews((reviews) => reviews.filter((review) => review.id !== id));
  };

  const updateFileMap = (blob: string, file: File) => {
    const newFileMap = { blob, file };
    setFileMap((fileMap) => [...fileMap, newFileMap]);
  };

  const changeReviewImage = (id: string, blob: string) => {
    const newReviews = reviews.map((review) => ({ ...review }));
    newReviews.find((review) => review.id === id)!.image = blob;
    setReviews(newReviews);
  };

  const changeReviewRating = (id: string, rating: number) => {
    const newReviews = reviews.map((review) => ({ ...review }));
    newReviews.find((review) => review.id === id)!.rating = rating;
    setReviews(newReviews);
  };

  const changeReviewAuthor = (id: string, author: string) => {
    const newReviews = reviews.map((review) => ({ ...review }));
    newReviews.find((review) => review.id === id)!.author = author;
    setReviews(newReviews);
  };

  const changeReviewComment = (id: string, comment: string) => {
    const newReviews = reviews.map((review) => ({ ...review }));
    newReviews.find((review) => review.id === id)!.comment = comment;
    setReviews(newReviews);
  };

  const changeReviewDate = (id: string, date: Date) => {
    const newReviews = reviews.map((review) => ({ ...review }));
    newReviews.find((review) => review.id === id)!.created_at = date;
    setReviews(newReviews);
  };

  const resetToDefault = () => {
    setReviews(savedReviews);
    setIsChanged(false);
  };

  const replaceBlobsWithURLs = async () => {
    let updatedReviews = [...reviews];

    // Extract blob URLs from image
    const blobs = reviews
      .map((review) => review.image)
      .filter((url) => url?.startsWith('blob:'));

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

      updatedReviews = reviews.map((review) => {
        if (review.image?.startsWith('blob:')) {
          const index = blobs.indexOf(review.image);
          const newURL = urls[index] || review.image;
          return { ...review, image: newURL };
        }
        return review;
      });
    }

    return updatedReviews;
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const updatedReviews = await replaceBlobsWithURLs();
      const response = await updateReviewsAction(updatedReviews);

      if (response.success) {
        toast.success('Đã lưu thay đổi.');
        setReviews(updatedReviews);
        setSavedReviews(updatedReviews);
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
          values={reviews}
          onReorder={setReviews}
          className="flex flex-col gap-6"
        >
          {reviews.map((review, index) => (
            <ProductReviewItem
              key={review.id}
              index={index}
              review={review}
              deleteReview={deleteReview.bind(null, review.id)}
              updateFileMap={updateFileMap}
              changeReviewImage={changeReviewImage.bind(null, review.id)}
              changeReviewRating={changeReviewRating.bind(null, review.id)}
              changeReviewAuthor={changeReviewAuthor.bind(null, review.id)}
              changeReviewComment={changeReviewComment.bind(null, review.id)}
              changeReviewDate={changeReviewDate.bind(null, review.id)}
            />
          ))}

          <label className="group place-items-center grid p-4 border-2 hover:border-muted-foreground border-dashed rounded-xl h-[300px] transition-colors cursor-pointer">
            <Plus className="group-hover:text-muted-foreground text-border size-16 transition-colors" />
            <Button className="sr-only" onClick={createNewReview}>
              Thêm review
            </Button>
          </label>
        </Reorder.Group>
      </CardContent>
    </Card>
  );
}
