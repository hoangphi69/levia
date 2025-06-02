import { errors, jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.RESET_PASSWORD_SECRET);

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function generateResetPasswordToken(id: string) {
  return await new SignJWT({ sub: id, iss: 'reset-password' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m') // After 15 minutes
    .sign(secret);
}

async function verifyResetPasswordToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.iss !== 'reset-password') {
      return { valid: false, expired: false };
    }

    return {
      valid: true,
      expired: false,
      userId: payload.sub as string,
    };
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      return { valid: false, expired: true };
    }

    return { valid: false, expired: false };
  }
}

export { generateUUID, generateResetPasswordToken, verifyResetPasswordToken };
