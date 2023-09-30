import { GetAllVehicles, GetFeaturedVehicles, GetVehicleDetail, PostVehicle, SearchVehicle } from "../controller/vehiclepost.controller"
import { validateToken } from "../middleware/validateToken"
import { Router } from "express"

const router = Router()

router.post("/list-vehicle", validateToken, PostVehicle)
router.get("/search-vehicle", SearchVehicle)
router.get("/featured-vehicles", GetFeaturedVehicles)
router.get("/vehicle-detail/:id", GetVehicleDetail)
router.get("/all-vehicles",GetAllVehicles)

export const vehiclePostRoutes = router