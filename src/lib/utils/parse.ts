import { ZodError } from 'zod';

function parseZodError(error: ZodError): Record<string, string | undefined> {
  const errors = error.flatten().fieldErrors;

  const firstErrors = Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [field, messages?.[0]])
  );

  return firstErrors;
}

export { parseZodError };
