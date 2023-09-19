import { GetRequest } from "@/app/services/httpRequest";

export const getVehicleDetail = async (id: string) => {
    try {
        const vehicle = GetRequest(`/vehicle/vehicle-detail/${id}`);
        return vehicle;
    } catch (error) {
        throw error;
    }
}
