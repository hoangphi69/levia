'use server';

import { LoginFormSchema, RegisterFormSchema } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/session';
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
  else
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

export { login, logout, register };
