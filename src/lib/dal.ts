import { cookies } from 'next/headers';
import { cache } from 'react';
import 'server-only';
import { decrypt } from './session';
import { redirect } from 'next/navigation';
import prisma from './prisma';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.id) redirect('/admin/login');

  return { isAuth: true, id: session.id };
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id as string },
      select: {
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
