'use server';

import { ProductMedia, ProductReview } from '@prisma/client';
import { ProductMetadata } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { getCategoryByTitle } from './category';

async function getAllProducts() {
  return await prisma.product.findMany({
    select: {
      id: true,
      model: true,
      title: true,
      price: true,
      Category: {
        select: {
          title: true,
        },
      },
    },
    orderBy: { created_at: 'desc' }, // Newest first
  });
}

async function getProductByID(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      media: true,
      reviews: true,
      Category: true,
    },
  });
}

async function checkProductExistedByModel(model: string) {
  const result = await prisma.product.findUnique({ where: { model } });
  return !!result;
}

async function createProduct(
  model: string,
  title: string,
  categoryTitle: string
) {
  const category = await getCategoryByTitle(categoryTitle);

  const newProduct = await prisma.product.create({
    data: {
      model,
      title,
      category_id: category?.id,
    },
  });

  return newProduct.id;
}

async function updateProductMetadata(id: string, metadata: ProductMetadata) {
  const {
    model,
    title,
    category: categoryTitle,
    price,
    description,
  } = metadata;

  const category = await getCategoryByTitle(categoryTitle);

  const result = await prisma.product.update({
    where: { id },
    data: {
      model,
      title,
      category_id: category?.id,
      price,
      description,
    },
  });
}

async function updateProductImages(id: string, images: string[]) {
  const result = await prisma.product.update({
    where: { id },
    data: { images },
  });
}

async function updateProductMedia(
  productId: string,
  updatedMedia: ProductMedia[]
) {
  try {
    // Fetch existing media for comparison
    const existingMedia = await prisma.productMedia.findMany({
      where: { product_id: productId },
    });

    const existingIds = new Set(existingMedia.map((media) => media.id));
    const updatedIds = new Set(
      updatedMedia.map((media) => media.id).filter(Boolean)
    );

    // Determine media to create, update, or delete
    const mediaToCreate = updatedMedia.filter((media) =>
      media.id.startsWith('temp:')
    );
    const mediaToUpdate = updatedMedia.filter(
      (media) => media.id && existingIds.has(media.id)
    );
    const mediaToDelete = existingMedia.filter(
      (media) => !updatedIds.has(media.id)
    );

    // Perform batch operations
    await prisma.$transaction([
      ...mediaToCreate.map(({ title, subtitle, media_url, style }) =>
        prisma.productMedia.create({
          data: {
            title,
            subtitle,
            media_url,
            style,
            product_id: productId,
          },
        })
      ),
      ...mediaToUpdate.map((media) =>
        prisma.productMedia.update({
          where: { id: media.id },
          data: {
            title: media.title,
            subtitle: media.subtitle,
            media_url: media.media_url,
            style: media.style,
          },
        })
      ),
      ...mediaToDelete.map((media) =>
        prisma.productMedia.delete({
          where: { id: media.id },
        })
      ),
    ]);

    return { success: true, message: 'Product media updated successfully!' };
  } catch (error) {
    console.error('Error updating product media:', error);
    return { success: false, message: 'Failed to update product media.' };
  }
}

async function updateProductReview(
  productId: string,
  updatedReviews: ProductReview[]
) {
  try {
    // Fetch existing reviews for comparison
    const existingReviews = await prisma.productReview.findMany({
      where: { product_id: productId },
    });

    const existingIds = new Set(existingReviews.map((review) => review.id));
    const updatedIds = new Set(
      updatedReviews.map((review) => review.id).filter(Boolean)
    );

    // Determine reviews to create, update, or delete
    const reviewsToCreate = updatedReviews.filter((review) =>
      review.id.startsWith('temp:')
    );
    const reviewsToUpdate = updatedReviews.filter(
      (review) => review.id && existingIds.has(review.id)
    );
    const reviewsToDelete = existingReviews.filter(
      (review) => !updatedIds.has(review.id)
    );

    // Perform batch operations
    await prisma.$transaction([
      ...reviewsToCreate.map(({ rating, comment, image, author, created_at }) =>
        prisma.productReview.create({
          data: {
            rating,
            comment,
            image,
            author,
            created_at,
            product_id: productId,
          },
        })
      ),
      ...reviewsToUpdate.map((review) =>
        prisma.productReview.update({
          where: { id: review.id },
          data: {
            rating: review.rating,
            comment: review.comment,
            image: review.image,
            author: review.author,
            created_at: review.created_at,
          },
        })
      ),
      ...reviewsToDelete.map((review) =>
        prisma.productReview.delete({
          where: { id: review.id },
        })
      ),
    ]);

    return { success: true, message: 'Product reviews updated successfully!' };
  } catch (error) {
    console.error('Error updating product reviews:', error);
    return { success: false, message: 'Failed to update product reviews.' };
  }
}

async function deleteProductByModel(model: string) {
  const result = await prisma.product.delete({ where: { model } });
  if (result) return { success: true };
  return { success: false };
}

export {
  checkProductExistedByModel,
  createProduct,
  deleteProductByModel,
  getAllProducts,
  getProductByID,
  updateProductImages,
  updateProductMedia,
  updateProductMetadata,
  updateProductReview,
};
