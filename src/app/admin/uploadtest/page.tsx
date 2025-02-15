'use client';

import React from 'react';
import Header from '../components/header';
import { UploadDropzone } from '@/app/lib/uploadthing';

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
        <UploadDropzone endpoint={'imageUploader'}></UploadDropzone>
      </section>
    </>
  );
}
