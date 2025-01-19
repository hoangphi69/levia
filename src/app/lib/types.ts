import { z } from 'zod';

export const ContactFormSchema = z.object({
  email: z
    .string({ required_error: 'Email không được để trống.' })
    .email('Không đúng định dạng email.'),
  fullname: z
    .string({ required_error: 'Họ tên không được để trống' })
    .trim()
    .min(2, 'Họ tên phải từ 2 ký tự trở lên.')
    .max(50, 'Họ tên không được quá 50 ký tự'),
  message: z.string({ required_error: 'Nội dung không được để trống' }).trim(),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;
