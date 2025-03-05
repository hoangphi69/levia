'use server';

import React from 'react';
import Header from '../components/header';
import Experimental from './experimental';
import prisma from '@/app/lib/prisma';
import { utapi } from '@/app/lib/uploadthing';

const id = 'd2122fac-e1a2-4bc6-a13a-588a042e49a8';

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

export async function saveImageOrder(newOrder: string[]) {
  // 'use server';
  const result = await prisma.product.update({
    where: { id },
    data: { images: newOrder },
  });
}

export async function uploadImages(files: File[]) {
  // 'use server';
  return await utapi.uploadFiles(files);
}

export async function removeUploadedImage(keys: string[]) {
  'use server';
  await utapi.deleteFiles(keys);
}

// export async function removeUploadedImage()

export default async function DragnDrop() {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      images: true,
    },
  });

  const images = product?.images;

  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />
      <section className="gap-4 grid grid-cols-1 mx-auto p-4 container">
        {images && (
          <Experimental /* onSave={saveImageOrder} */ initialItems={images} />
        )}
      </section>
    </>
  );
}
