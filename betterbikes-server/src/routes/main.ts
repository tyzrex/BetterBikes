import { authRoutes } from "./auth.route"
import { DashboardRoutes } from "./dashboard.route"
import { vehiclePostRoutes } from "./vehiclepost.route"
import { BookingRoutes } from "./booking.route"
import messengerRoutes from "./messenger.route"
import { Router } from "express"

const router = Router()

router.use("/auth", authRoutes)
router.use("/dashboard", DashboardRoutes)
router.use("/vehiclepost", vehiclePostRoutes)
router.use("/booking", BookingRoutes)
router.use("/messenger", messengerRoutes)

export default router