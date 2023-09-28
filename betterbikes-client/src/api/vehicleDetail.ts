
export const getVehicleDetail = async (id: string) => {
    try {
        // const vehicle = await serverRequest(`/vehiclepost/vehicle-detail/${id}`, "GET");
        const vehicle = await fetch(`${process.env.API_URL}/vehiclepost/vehicle-detail/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await vehicle.json()
        if (vehicle.status === 200) {
            return data
        }
        else {
            throw {
                status: vehicle.status,
                message: data.message
            }
        }
    } catch (error) {
        throw error;
    }
}
