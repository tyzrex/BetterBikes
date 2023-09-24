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

export interface IBookingData {
    dashboardData: DashboardData;
}

export interface DashboardData {
    bookingRequests: BookingRequest[];
    pages:           number;
    previousPage:    string;
    nextPage:        string;
}

export interface BookingRequest {
    booking_id:      string;
    start_date:      Date;
    end_date:        Date;
    vehicle_post_id: string;
    authUser : {
      name: string;
    } | null;
    oauthUser: {
      name: string;
    } | null;
    vehicle_post:    BookingPost;
}

export interface BookingPost {
  vehicle_post_id:  string;
    vehicle_name:   string;
    vehicle_image:  string;
    vehicle_price:  number;
    vehicle_type:   string;
    created_at:     Date;
    vehicle_brand:  string;
    vehicle_number: string;
}
