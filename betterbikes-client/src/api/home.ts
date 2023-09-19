import { GetRequest } from "@/app/services/httpRequest";

export const getFeaturedVehicles = async () => {
    try {
        const featuredVehicles = await GetRequest(`/vehicle/featured-vehicles`);
        return featuredVehicles.data;
    } catch (error) {
        throw error;
    }
}