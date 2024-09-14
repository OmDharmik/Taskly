import { z } from 'zod';

const userSignup = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const userSignin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { userSignin, userSignup };
