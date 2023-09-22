import { serverRequest } from "@/app/services/serverRequest";

export const getVehicleDetail = async (id: string) => {
    try {
        const vehicle = await serverRequest(`/vehicle/vehicle-detail/${id}`, "GET");
        return vehicle
    } catch (error) {
        throw error;
    }
}
