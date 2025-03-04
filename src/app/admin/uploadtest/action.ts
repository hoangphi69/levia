'use server';

import { utapi } from '@/app/lib/uploadthing';

export async function uploadImages(files: File[]) {
  return await utapi.uploadFiles(files);
}
