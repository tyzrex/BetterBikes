import { DashboardBookingData, DashboardData } from "../controller/dashboard.controller"
import { validateToken } from "../middleware/validateToken"
import { Router } from "express"

const router = Router()

router.get("/dashboard-data", validateToken, DashboardData)
router.get("/booking-requests", validateToken, DashboardBookingData)

export const DashboardRoutes = router