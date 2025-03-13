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

export const ProductMetadataFormSchema = z.object({
  model: z
    .string({ required_error: 'Model không được để trống.' })
    .trim()
    .min(2, 'Model phải có ít nhất 2 ký tự.')
    .max(10, 'Model không được vượt quá 10 ký tự.')
    .regex(/^\S+$/, 'Model không được chứa khoảng trắng.'),
  title: z
    .string({ required_error: 'Tên sản phẩm không được để trống.' })
    .trim()
    .min(2, 'Tên sản phẩm phải có ít nhất 2 ký tự.')
    .max(100, 'Tên sản phẩm không được vượt quá 100 ký tự.'),
  category: z.string({ required_error: 'Danh mục không được để trống.' }),
  price: z.coerce
    .number()
    .min(0, 'Giá tiền phải là số không âm.')
    .optional()
    .transform((val) => (val === null ? undefined : val)),
  description: z
    .string()
    .optional()
    .transform((val) => (val === null ? undefined : val)),
});

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: 'Email không được để trống.' })
    .email('Không đúng định dạng email.')
    .trim(),
  password: z.string({ required_error: 'Mật khẩu không được để trống' }).trim(),
});

// export type LoginFormState =
//   | {
//       errors?: {
//         email?: string[];
//         password?: string[];
//       };
//       message?: string;
//     }
//   | undefined;

export type Params = Promise<{ id: string }>;

export type FileMap = { blob: string; file: File };

export type ProductMetadata = {
  model: string;
  title: string;
  category: string;
  price?: number | undefined;
  description?: string | undefined;
};
