import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { UploadedFile } from 'express-fileupload';

import { prisma } from '../config/prisma';
import { IVehiclePost } from '../interfaces/vehiclePost';

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (uploadFile: UploadedFile) => {
  try {
    const publicId = `vehicle/${uploadFile.name.split(".")[0]}-${Date.now()}`;

    const result = await cloudinary.uploader.upload(uploadFile.tempFilePath, {
      public_id: publicId,
      resource_type: "auto",
      folder: "uploaded",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });
    if (result.url) {
      return result.url;
    }
  } catch (error) {
    throw Error;
  }
};

export const createPost = async (
  vehiclePost: IVehiclePost,
  userId: string
) => {
  try {
    const newVehiclePost = await prisma.vehiclePost.create({
      data: {
        vehicle_name: vehiclePost.vehicleName,
        vehicle_type: vehiclePost.vehicleType,
        vehicle_image: vehiclePost.vehicleImage ? vehiclePost.vehicleImage : "",
        vehicle_features: vehiclePost.vehicleFeatures,
        vehicle_number: vehiclePost.vehicleNumber,
        vehicle_model: vehiclePost.vehicleManufactureDate,
        vehicle_brand: vehiclePost.vehicleBrand,
        vehicle_color: vehiclePost.vehicleColor,
        vehicle_price: parseInt(vehiclePost.vehiclePrice),
        vehicle_description: vehiclePost.vehicleDescription,
        user_id : userId
      },
    });
    return newVehiclePost;
  } catch (error) {
    throw error;
  }
};

export const getVehicleDetail = async(id: string) => {
  try{
    const vehicleDetail = await prisma.vehiclePost.findUnique({
      where: {
        vehicle_post_id: id
      }
    })
    if(!vehicleDetail){
      throw new Error("Vehicle not found")
    }
    else{
      return vehicleDetail
    }
  }catch(err){
    throw err;
  }
}

export const getFeaturedVehicles = async () => {
  try{
    const featuredVehicles = await prisma.vehiclePost.findMany({
      take: 5,

      select: {
        vehicle_name: true,
        vehicle_image: true,
        vehicle_post_id: true,
        vehicle_price: true
      }
    })
    return featuredVehicles
  }catch(err){
    throw err
  }
}

export const searchVehicles = async (
    name?: string,
    // type?: string,
    // startDate?: string,
    // endDate?: string,
) => {
    try{
    const vehicles = await prisma.vehiclePost.findMany({
      where: {
        OR: [
          { vehicle_name: { contains: name, mode: 'insensitive' } },
          { vehicle_brand: { contains: name, mode: 'insensitive' } },
      
        ],
      },
    });
    return vehicles;
    }
    catch(err){
        throw err
    }
}

const MAX_VEHICLE_POSTS = 10

export const getAllVehicles = async (
  currentPage: number
) => {
  try{
    const count = await prisma.vehiclePost.count();
            const pages = Math.ceil(count/MAX_VEHICLE_POSTS)
        const previousPage = currentPage > 1 ? `/?page=${currentPage-1}` : null
        const nextPage = currentPage < pages ? `/?page=${currentPage+1}` : null
    //get all vehicles except the ones that are the user's own
    const vehicles = await prisma.vehiclePost.findMany({
      take: MAX_VEHICLE_POSTS,
      skip: (currentPage - 1) * MAX_VEHICLE_POSTS,

      select: {
        vehicle_name: true,
        vehicle_image: true,
        vehicle_post_id: true,
        vehicle_price: true
      }
    })
    return {
      vehicles,
      pages,
      nextPage,
      previousPage
    }
  }catch(err){
    throw err
  }
}
