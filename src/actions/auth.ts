'use server';

import {
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordFormSchema,
  SendEmailResetPasswordFormSchema,
} from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { sendResetPasswordEmail } from '@/lib/resend';
import { createSession, deleteSession } from '@/lib/session';
import {
  generateResetPasswordToken,
  verifyResetPasswordToken,
} from '@/lib/utils/generators';
import { parseZodError } from '@/lib/utils/parse';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

async function register(_state: any, formData: FormData) {
  // Server-side validation
  const validated = RegisterFormSchema.safeParse(Object.fromEntries(formData));
  if (!validated.success) return parseZodError(validated.error);

  const exist = await prisma.user.findUnique({
    where: { email: validated.data.email },
  });
  if (exist) return { email: 'Email đã tồn tại' };

  // Create user
  const { confirm_password, ...user } = validated.data;
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hashed = await bcrypt.hash(validated.data.password, salt);
  user.password = hashed;
  const result = await prisma.user.create({ data: user });

  // Response client
  if (!result) return { message: 'Đã có lỗi xảy ra' };

  return {
    success: true,
    message:
      'Tạo tài khoản thành công. Vui lòng liên hệ với admin để kích hoạt tài khoản',
    redirect: '/admin/login',
  };
}

async function login(_state: any, formData: FormData) {
  // Server-side validation
  const validated = LoginFormSchema.safeParse(Object.fromEntries(formData));
  if (!validated.success) return parseZodError(validated.error);

  const userFound = await prisma.user.findUnique({
    where: { email: validated.data.email },
  });
  if (!userFound) return { password: 'Email hoặc mật khẩu không đúng' };

  const correct = await bcrypt.compare(
    validated.data.password,
    userFound.password
  );
  if (!correct) return { password: 'Email hoặc mật khẩu không đúng' };

  const active = userFound.active;
  if (!active) return { password: 'Tài khoản chưa được kích hoạt' };

  // Create user session
  await createSession({ id: userFound.id, role: userFound.role });

  // Redirect
  redirect('/admin');
}

async function logout() {
  deleteSession();
  redirect('/admin/login');
}

async function sendEmailResetPassword(_state: any, formData: FormData) {
  // Server-side validation
  const validated = SendEmailResetPasswordFormSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validated.success) return parseZodError(validated.error);

  const existed = await prisma.user.findUnique({
    where: { email: validated.data.email },
  });
  if (!existed || !existed.active)
    return { success: true, message: 'Vui lòng kiểm tra email.' };

  // Send reset password link email with token
  const token = await generateResetPasswordToken(existed.id);
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/forgot/${token}`;
  const { error } = await sendResetPasswordEmail(validated.data.email, link);
  if (error) {
    console.log(error);
    return { message: 'Đã có lỗi xảy ra.' };
  }
  return { success: true, message: 'Vui lòng kiểm tra email.' };
}

async function resetPassword(_state: any, formData: FormData) {
  // Server-side validation
  const validated = ResetPasswordFormSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validated.success) return parseZodError(validated.error);

  const verified = await verifyResetPasswordToken(validated.data.token);
  if (!verified.valid) return { message: 'Đã có lỗi xảy ra.' };

  // Update password
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hashed = await bcrypt.hash(validated.data.password, salt);
  const result = await prisma.user.update({
    where: { id: verified.userId },
    data: { password: hashed },
  });

  if (!result) return { message: 'Đã có lỗi xảy ra.' };
  return {
    success: true,
    message: 'Đặt lại mật khẩu thành công.',
    redirect: '/admin/login',
  };
}

export { login, logout, register, resetPassword, sendEmailResetPassword };
