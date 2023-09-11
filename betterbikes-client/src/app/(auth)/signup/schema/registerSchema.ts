import {z} from 'zod'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const registerSchema = z.object({
    fullName:z.string().nonempty("Name cannot be empty").min(1).max(30),
    email: z.string().nonempty("Email cannopt be empty").email(),
    password: z.string().nonempty("Password cannot be empty").min(6, "Password must be atleast 6 characters").max(100),
    confirmPassword: z.string().nonempty("Confirm Password cannot be empty").min(6, "Password must be atleast 6 characters").max(100),
    phone: z.string().nonempty("Phone cannot be emptyf").regex(phoneRegex, 'Invalid Number!'),
    address: z.string().nonempty("Address Field Required").min(3, "Minimum 3 characters")
  })
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });


export type RegisterSchemaType = z.infer<typeof registerSchema>
