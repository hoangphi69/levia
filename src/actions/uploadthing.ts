'use server';

// TODO: Switch to other file upload provider.

import { utapi } from '@/lib/uploadthing';

export async function uploadFiles(files: File[]) {
  return await utapi.uploadFiles(files);
}

export async function removeUploadedImage(keys: string[]) {
  await utapi.deleteFiles(keys);
}
