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

export const ProductAddFormSchema = z.object({
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

export const RegisterFormSchema = z
  .object({
    name: z
      .string({ required_error: 'Tên không được để trống.' })
      .trim()
      .min(2, 'Tên phải từ 2 ký tự trở lên.')
      .max(50, 'Tên không được quá 50 ký tự'),
    email: z
      .string({ required_error: 'Email không được để trống.' })
      .trim()
      .nonempty('Email không được để trống.')
      .email('Không đúng định dạng email.'),
    password: z
      .string({ required_error: 'Mật khẩu không được để trống' })
      .nonempty('Mật khẩu không được để trống.')
      .min(6, 'Mật khẩu phải từ 6 ký tự trở lên.')
      .max(50, 'Mật khẩu không được quá 50 ký tự.')
      .regex(/^\S+$/, 'Mật khẩu không được chứa khoảng trắng.'),
    confirm_password: z
      .string({ required_error: 'Nhập lại mật khẩu không được để trống' })
      .nonempty('Nhập lại mật khẩu không được để trống.'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu không khớp.',
    path: ['confirm_password'],
  });

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: 'Email không được để trống.' })
    .trim()
    .nonempty('Email không được để trống.')
    .email('Không đúng định dạng email.'),
  password: z
    .string({ required_error: 'Mật khẩu không được để trống' })
    .nonempty('Mật khẩu không được để trống.'),
});

export const SendEmailResetPasswordFormSchema = z.object({
  email: z
    .string({ required_error: 'Email không được để trống.' })
    .trim()
    .nonempty('Email không được để trống.')
    .email('Không đúng định dạng email.'),
});

export const ResetPasswordFormSchema = z
  .object({
    token: z.string().nonempty(),
    password: z
      .string({ required_error: 'Mật khẩu không được để trống' })
      .nonempty('Mật khẩu không được để trống.')
      .min(6, 'Mật khẩu phải từ 6 ký tự trở lên.')
      .max(50, 'Mật khẩu không được quá 50 ký tự.')
      .regex(/^\S+$/, 'Mật khẩu không được chứa khoảng trắng.'),
    confirm_password: z
      .string({ required_error: 'Nhập lại mật khẩu không được để trống' })
      .nonempty('Nhập lại mật khẩu không được để trống.'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu không khớp.',
    path: ['confirm_password'],
  });

export type Params = Promise<{ id: string }>;

export type FileMap = { blob: string; file: File };

export type ProductMetadata = {
  model: string;
  title: string;
  category: string;
  price?: number | undefined;
  description?: string | undefined;
};
