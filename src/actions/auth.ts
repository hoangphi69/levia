'use server';

import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { LoginFormSchema } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/session';
import { parseZodError } from '@/lib/utils/parse';

// TODO: Implement register function
async function register(_state: any, formData: FormData) {}

async function login(_state: any, formData: FormData) {
  // Client-side validation
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
  if (!active) return { password: 'Tài khoản đã bị khóa' };

  // Create user session
  await createSession({ id: userFound.id, role: userFound.role });

  // Redirect user
  redirect('/admin');
}

async function logout() {
  deleteSession();
  redirect('/admin/login');
}

export { login, logout };
