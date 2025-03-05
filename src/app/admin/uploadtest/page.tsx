'use client';

import React from 'react';
import Header from '../components/layout/header';
import { Input } from '@/components/shadcn/input';
import { uploadImages } from './action';
import { Button } from '@/components/shadcn/button';

export async function handleFormSubmit(formData: FormData) {
  const files = formData.getAll('files');
  const response = await uploadImages(files as File[]);
  console.log(response);
}

export default function UploadTest() {
  const header = {
    title: 'Test upload',
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/admin',
      },
      {
        display: 'Upload',
      },
    ],
  };

  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />
      <section className="gap-4 grid grid-cols-4 mx-auto p-4 container">
        <form action={handleFormSubmit}>
          <Input name="files" type="file" accept="image/*" />
          <Button type="submit">Upload</Button>
        </form>
      </section>
    </>
  );
}
