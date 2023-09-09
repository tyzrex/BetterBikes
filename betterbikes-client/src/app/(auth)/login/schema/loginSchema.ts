import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().nonempty("Email is required").email(),
    password:z.string().nonempty("Password is required").min(6, "Password must be atleast 6 characters").max(100)
})


export type LoginSchemaType = z.infer<typeof loginSchema>