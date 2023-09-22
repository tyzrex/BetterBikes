export interface FileData {
  preview: string;
  data: any;
}

export interface VehicleData {
  vehicleName: string;
  vehicleBrand: string;
  vehicleColor: string;
  address: string;
  pricePerDay: string;
  vehicleMakeYear: string;
  vehicleType: string;
  vehicleDescription: string;
  numberPlate: string;
  features: string;
  vehiclefile: string;
}

export interface PostError {
  vehicleName: string;
  vehicleBrand: string;
  vehicleColor: string;
  address: string;
  pricePerDay: string;
  vehicleMakeYear: string;
  vehicleType: string;
  vehicleDescription: string;
  numberPlate: string;
  features: string;
  vehiclefile: string;
}

export interface IFeaturedResponse{
  featuredVehicles: IFeaturedVehicle[]
}
export interface IFeaturedVehicle{
    vehicle_name: string;
    vehicle_image: string;
    vehicle_post_id: string;
    vehicle_price: number;
}

