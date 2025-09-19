import { z } from 'zod';

export const RegisterInput = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }).optional(),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type RegisterInput = z.infer<typeof RegisterInput>;

export const signinInput = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type SigninInput = z.infer<typeof signinInput>;
