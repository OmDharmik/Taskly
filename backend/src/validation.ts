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

const createTodo = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export { createTodo, userSignin, userSignup };
