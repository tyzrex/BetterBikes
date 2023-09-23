import { GetFeaturedVehicles, GetVehicleDetail, PostVehicle, SearchVehicle } from "../controller/vehiclepost.controller"
import { validateToken } from "../middleware/validateToken"

export const vehiclePostRoutes = (app: any) => {    
    app.post("/vehicle/list-vehicle", validateToken, PostVehicle)
    app.get("/vehicle/search-vehicle", SearchVehicle)
    app.get("/vehicle/featured-vehicles", GetFeaturedVehicles)
    app.get("/vehicle/vehicle-detail/:id", GetVehicleDetail)
}