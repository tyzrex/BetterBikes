import { serverRequest } from "@/app/services/serverRequest";

export const getFeaturedVehicles = async () => {
    try {
        const featuredVehicles = await serverRequest("/vehiclepost/featured-vehicles", "GET");
        return featuredVehicles;
    } catch (error) {
        throw error;
    }
}