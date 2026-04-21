import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters')
});

export const registerSchema = z.object({
    name: z.string('Full name is required').min(5, 'Full name must be 5 or more characters').max(30, 'Full name must be 30 or less characters'),
    businessName: z.string('Business name is required').min(5, 'Business name must be 5 or more characters').max(30, 'Business name must be 30 or less characters'),
    email: z.email(),
    password: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters'),
    confirmPassword: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters'),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password do not match",
    path: ["confirmPassword"],
  });;