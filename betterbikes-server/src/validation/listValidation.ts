import { z } from 'zod';

export const VehicleSchema = z.object({
  vehicleImage: z
    .optional(
      z.string({
        required_error: "Vehicle image is required",
        invalid_type_error: "Invalid Vehicle Image",
      })
    )
  ,
  vehicleName: z
    .string({
      required_error: "Vehicle name is required",
      invalid_type_error: "Invalid Vehicle Name",
    })
    .min(2)
    .max(100),
  vehicleBrand: z
    .string({
      required_error: "Vehicle brand is required",
      invalid_type_error: "Invalid Vehicle Brand",
    })
    .min(2)
    .max(100),
  vehicleType: z
    .string({
      required_error: "Vehicle type is required",
      invalid_type_error: "Invalid Vehicle Type",
    })
    .min(2)
    .max(100),
  vehicleColor: z
    .string({
      required_error: "Vehicle color is required",
      invalid_type_error: "Invalid Vehicle Color",
    })
    .min(2)
    .max(100),
  vehiclePrice: z
    .string({
      required_error: "Vehicle price is required",
      invalid_type_error: "Invalid Vehicle Price",
    })
    .min(2)
    .max(100),
  vehicleNumber: z
    .string({
      required_error: "Vehicle number is required",
      invalid_type_error: "Invalid Vehicle Number",
    })
    .min(2)
    .max(100),
  vehicleAddress: z
    .string({
      required_error: "Vehicle address is required",
      invalid_type_error: "Invalid Vehicle Address",
    })
    .min(2)
    .max(100),
  vehicleManufactureDate: z
    .string({
      required_error: "Vehicle manufacture date is required",
      invalid_type_error: "Invalid Manufacture Date",
    })
    .min(2)
    .max(100),
  vehicleDescription: z
    .string({
      required_error: "Vehicle description is required",
      invalid_type_error: "Invalid Vehicle Description",
    })
    .min(2)
    .max(100),
  vehicleFeatures: z
    .array(
      z.string({
        required_error: "Vehicle feature is required",
        invalid_type_error: "Invalid Vehicle Feature",
      })
      
    )
    .refine((value) => value.length > 0, {
      message: "At least one vehicle feature is required",
    }),
});

export type VehicleSchemaType = z.infer<typeof VehicleSchema>;
