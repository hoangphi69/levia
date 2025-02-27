'use server';

import { revalidatePath } from 'next/cache';
import prisma from './prisma';

async function AddProductImage({ id, url }: { id: string; url: string }) {
  try {
    const result = await prisma.product.update({
      where: { id },
      data: {
        images: {
          push: url,
        },
      },
    });

    revalidatePath(`/admin/products/${id}`);
    return { result };
  } catch (error) {
    return { error };
  }
}

export { AddProductImage };
