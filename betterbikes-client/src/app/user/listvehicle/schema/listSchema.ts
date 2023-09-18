import {z} from 'zod'

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const VehicleSchema = z.object({
    vehicleImage:
         z
    .any()

    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine((files) => files?.[0]?.size < MAX_FILE_SIZE, `Max image size is 5MB.`)
    ,
    // vehicleImage: z.string().nonempty("Vehicle image is required").min(2, "Vehicle image must be atleast 2 characters").max(100),
    vehicleName: z.string().nonempty("Vehicle name is required").min(2, "Vehicle name must be atleast 2 characters").max(100),
    vehicleBrand: z.string().nonempty("Vehicle brand is required").min(2, "Vehicle brand must be atleast 2 characters").max(100),
    vehicleType:   z.string().min(1, "Select an option"),
    vehicleColor: z.string().nonempty("Vehicle color is required").min(2, "Vehicle color must be atleast 2 characters").max(100),
    vehiclePrice: z.string().nonempty("Vehicle price is required").min(2, "Vehicle price must be atleast 2 characters").max(100),
    vehicleNumber: z.string().nonempty("Vehicle number is required").min(2, "Vehicle number must be atleast 2 characters").max(100),
    vehicleAddress: z.string().nonempty("Vehicle address is required").min(2, "Vehicle address must be atleast 2 characters").max(100),
    vehicleManufactureDate: z.string().nonempty("Vehicle manufacture date is required").min(2, "Vehicle manufacture date must be atleast 2 characters").max(100),
    vehicleDescription: z.string().nonempty("Vehicle description is required").min(2, "Vehicle description must be atleast 2 characters").max(100),
    vehicleFeatures: z.array(z.object({
        feature: z.string().nonempty("Vehicle feature is required").min(2, "Vehicle feature must be at least 2 characters").max(100),
    })),})


export type VehicleSchemaType = z.infer<typeof VehicleSchema>

