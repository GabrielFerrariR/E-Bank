import { z } from 'zod';

const passwordValidationRegex = /(?=.*\d)(?=.*[A-Z])(?=.*\W)/;

export const userSchema= z.object({
  username: z.string().min(3),
  password: z.string().min(8).refine((str) => passwordValidationRegex.test(str), {
    message: 'a senha deve conter ao menos um número, letra maiúscula e caracter especial',
  })
});

export type IUser = z.infer<typeof userSchema>