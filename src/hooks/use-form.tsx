import { parseZodError } from '@/lib/utils/parse';
import {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react';
import { ZodSchema } from 'zod';

type FormErrors = ReturnType<typeof parseZodError>;

type useFormProps = {
  schema: ZodSchema;
  action: (
    state: any,
    formData: FormData
  ) => Promise<FormErrors | Record<string, any>>;
};

export function useForm({ schema, action }: useFormProps) {
  const [state, server, pending] = useActionState(action, undefined);
  const [errors, setErrors] = useState(state);

  useEffect(() => setErrors(state), [state]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);
    const validated = schema.safeParse(formObject);

    if (!validated.success) {
      setErrors(parseZodError(validated.error));
      return;
    }

    startTransition(() => server(formData));
  };

  return { errors, submit, pending };
}
