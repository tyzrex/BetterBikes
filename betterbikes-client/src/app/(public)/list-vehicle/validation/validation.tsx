import * as yup from "yup";
import { VehicleData } from "../types/types";

const regex = {
  alphaNumeric: {
    regex: /^[A-Za-z0-9._ ]+$/,
  },

  alpha: {
    regex: /^[A-Za-z]+$/,
  },

  numeric: {
    regex: /^[0-9]+$/,
  },
};

const validationSchema = yup.object().shape({
  vehicleName: yup
    .string()
    .matches(regex.alphaNumeric.regex, "Vehicle Name should be alphanumeric")
    .required("Vehicle Name is required"),
  vehicleType: yup
    .string()
    .matches(regex.alphaNumeric.regex, "Vehicle Type should be alphanumeric")
    .required("Vehicle Type is required"),
  vehicleMakeYear: yup
    .number()
    .integer()
    .positive()
    .required("Vehicle Make Year is required"),
  vehicleBrand: yup
    .string()
    .required("Vehicle Brand is required")
    .matches(regex.alphaNumeric.regex, "Vehicle Brand should be alphanumeric"),
  address: yup
    .string()
    .required("Address is required")
    .matches(regex.alphaNumeric.regex, "Address should be alphanumeric"),
  vehicleColor: yup
    .string()
    .required("Vehicle Color is required")
    .matches(regex.alphaNumeric.regex, "Vehicle Color should be alphanumeric"),
  pricePerDay: yup.number().required("Price per day is required").positive(),
  vehicleDescription: yup.string().required("Vehicle Description is required"),
  numberPlate: yup
    .string()
    .required("Number Plate is required")
    .matches(regex.alphaNumeric.regex, "Number Plate should be alphanumeric"),
  listingType: yup.string().required("Listing Type is required"),
  features: yup.string().required("Features are required"),
  // vehiclefile: yup.string().required("Vehicle Image is required"),
});

const validation = (values: VehicleData) => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error: yup.ValidationError | any) {
    const errors: { [key: string]: string } = {};
    error.inner.forEach((e: any) => {
      errors[e.path] = e.message;
    });
    return errors;
  }
};

export default validation;
