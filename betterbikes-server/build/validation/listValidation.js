"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleSchema = void 0;
const zod_1 = require("zod");
exports.VehicleSchema = zod_1.z.object({
    vehicleImage: zod_1.z
        .optional(zod_1.z.string({
        required_error: "Vehicle image is required",
        invalid_type_error: "Invalid Vehicle Image",
    })),
    vehicleName: zod_1.z
        .string({
        required_error: "Vehicle name is required",
        invalid_type_error: "Invalid Vehicle Name",
    })
        .min(2)
        .max(100),
    vehicleBrand: zod_1.z
        .string({
        required_error: "Vehicle brand is required",
        invalid_type_error: "Invalid Vehicle Brand",
    })
        .min(2)
        .max(100),
    vehicleType: zod_1.z
        .string({
        required_error: "Vehicle type is required",
        invalid_type_error: "Invalid Vehicle Type",
    })
        .min(2)
        .max(100),
    vehicleColor: zod_1.z
        .string({
        required_error: "Vehicle color is required",
        invalid_type_error: "Invalid Vehicle Color",
    })
        .min(2)
        .max(100),
    vehiclePrice: zod_1.z
        .string({
        required_error: "Vehicle price is required",
        invalid_type_error: "Invalid Vehicle Price",
    })
        .min(2)
        .max(100),
    vehicleNumber: zod_1.z
        .string({
        required_error: "Vehicle number is required",
        invalid_type_error: "Invalid Vehicle Number",
    })
        .min(2)
        .max(100),
    vehicleAddress: zod_1.z
        .string({
        required_error: "Vehicle address is required",
        invalid_type_error: "Invalid Vehicle Address",
    })
        .min(2)
        .max(100),
    vehicleManufactureDate: zod_1.z
        .string({
        required_error: "Vehicle manufacture date is required",
        invalid_type_error: "Invalid Manufacture Date",
    })
        .min(2)
        .max(100),
    vehicleDescription: zod_1.z
        .string({
        required_error: "Vehicle description is required",
        invalid_type_error: "Invalid Vehicle Description",
    })
        .min(2)
        .max(100),
    vehicleFeatures: zod_1.z
        .array(zod_1.z.string({
        required_error: "Vehicle feature is required",
        invalid_type_error: "Invalid Vehicle Feature",
    }))
        .refine((value) => value.length > 0, {
        message: "At least one vehicle feature is required",
    }),
});
