export interface ITableVehicle{
    vehicle_post_id: string;
    vehicle_type: string;
    vehicle_name: string;
    vehicle_image: string;
    vehicle_price: number;
    vehicle_model: string;
    vehicle_brand: string;
    created_at: string;
}

export interface IDashboardData{
    dashboardData: {
      vehiclesCount: number;
      bookingCount: number;
      vehiclePosts: ITableVehicle[];
      pages: number;
      nextPage: string;
      previousPage: string;
    };
}

export interface VehiclePost {
   vehicleData: {
    vehicle_post_id:     string;
    vehicle_type:        string;
    vehicle_model:       string;
    vehicle_number:      string;
    vehicle_image:       string;
    vehicle_color:       string;
    vehicle_price:       number;
    vehicle_brand:       string;
    vehicle_name:        string;
    vehicle_description: string;
    vehicle_features:    string[];
    created_at:          Date;
    updated_at:          Date;
    authUserID:         string | null;
    oauthUserID:        string | null;
   }
}