'use server';

import { redirect } from 'next/navigation';
import { LoginFormSchema } from '../definitions';
import prisma from '../prisma';
import { createSession, deleteSession } from '../session';

async function login(_state: any, formData: FormData) {
  // Form validation
  const validated = LoginFormSchema.safeParse(Object.fromEntries(formData));
  if (!validated.success) return validated.error.flatten().fieldErrors;

  const userFound = await prisma.user.findUnique({
    where: { email: validated.data.email },
  });
  if (!userFound) return { email: ['Email không tồn tại'] };

  // TODO: Hash password
  // Password validation
  const correct = userFound.password === validated.data.password;
  if (!correct) return { password: ['Mật khẩu không đúng'] };

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
