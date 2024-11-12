import { object, TypeOf, z } from "zod";

export const loginSchema = object({
    email: z.string().email(),
    password: z.string().min(4)
})


export const registerSchema = object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4).max(12),
    c_password: z.string().min(4).max(12)
}).refine((value) => value.password === value.c_password, {
    message: 'Password dont match gan',
    path: ['confirmPassword']
})

export type Ilogin = TypeOf<typeof loginSchema>
export type IRegister = TypeOf<typeof registerSchema>