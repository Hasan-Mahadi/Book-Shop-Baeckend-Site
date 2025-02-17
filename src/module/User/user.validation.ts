import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .max(20, { message: 'password can not be more than 20 characters' })
    .optional(),
  role: z.enum(['user', 'admin']).default('user'),
  isBlocked: z.boolean().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
