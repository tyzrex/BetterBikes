import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().nonempty("Email is required").email(),
    password:z.string().nonempty("Password is required").min(6, "Password must be atleast 6 characters").max(100)
})


export type LoginSchemaType = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    fullName:z.string().nonempty("Name cannot be empty").min(1).max(30),
    email: z.string().nonempty("Email cannopt be empty").email(),
    password: z.string().nonempty("Password cannot be empty").min(6, "Password must be atleast 6 characters").max(100),
    confirmPassword: z.string().nonempty("Confirm Password cannot be empty").min(6, "Password must be atleast 6 characters").max(100),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });


export type RegisterSchemaType = z.infer<typeof registerSchema>
