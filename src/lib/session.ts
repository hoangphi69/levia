import 'server-only';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.SESSION_SECRET);
type userPayload = { id: string; role: 'admin' | 'editor' | 'viewer' };

async function encrypt(payload: userPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session', error);
  }
}

async function createSession(user: userPayload) {
  const expired = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // After a weeek
  const session = await encrypt(user);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expired,
    sameSite: 'lax',
    path: '/',
  });
}

async function updateSession() {
  // Verify existing session
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);
  if (!session || !payload) return null;

  // Update session
  const expired = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // After a weeek
  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expired,
    sameSite: 'lax',
    path: '/',
  });
}

async function deleteSession() {
  (await cookies()).delete('session');
}

export { createSession, decrypt, deleteSession, encrypt, updateSession };
