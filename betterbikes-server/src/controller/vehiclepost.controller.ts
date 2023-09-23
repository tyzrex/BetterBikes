import { VehicleSchema } from "../validation/listValidation";
import { createPost, getFeaturedVehicles, getVehicleDetail, searchVehicles, uploadImage } from "../services/vehiclepost.services";
import AppError from "../utils/error";
import ErrorHandler from "../utils/errorType";
import e, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { checkUserType } from "../services/auth.services";

export const PostVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new AppError(500, "No files recieved"));
    }
    console.log(req.files);

    const userType = await checkUserType(res.locals.id);
    req.body.vehicleFeatures = JSON.parse(req.body.vehicleFeatures);
    req.body.vehicleImage = "";
    const vehicleData = VehicleSchema.parse(req.body);

    const uploadFile: UploadedFile = Array.isArray(req.files.file)
      ? req.files.file[0]
      : req.files.file;

    const uploadedImage = await uploadImage(uploadFile);

    if (!uploadedImage) {
      return next(new AppError(500, "Error uploading image"));
    }

    if (uploadedImage) {
      // req.body.vehicleImage = uploadedImage;
      vehicleData.vehicleImage = uploadedImage;
    }

    const vehiclePost = await createPost(vehicleData, userType);
    if (vehiclePost) {
      res.status(201).json({
        msg: "Successfully created vehicle post",
        vehiclePost,
      });
    }
  } catch (error) {
    const errors = ErrorHandler(error);
    next(new AppError(errors.statusCode, errors.message));
  }
};

export const SearchVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
 
    const searchQuery = req.query.name;
    // const currentPage = Number(req.query.page) || 1;
    const vehicleType = req.query.type;
    const vehicleData = await searchVehicles(
      searchQuery as string,
      // vehicleType as string
    );
    res.status(200).json({
      vehicleData,
    });

  } catch (error) {
    const errors = ErrorHandler(error);
    next(new AppError(errors.statusCode, errors.message));
  }
}

export const GetVehicleDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicleId = req.params.id;
    console.log(vehicleId);
    const vehicleData = await getVehicleDetail(vehicleId);
    res.status(200).json({
      vehicleData,
    });
  } catch (error) {
    const errors = ErrorHandler(error);
    next(new AppError(errors.statusCode, errors.message));
  }
}

export const GetFeaturedVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const featuredVehicles = await getFeaturedVehicles();
    res.status(200).json({
      featuredVehicles,
    });
  } catch (error) {
    const errors = ErrorHandler(error);
    next(new AppError(errors.statusCode, errors.message));
  }
}