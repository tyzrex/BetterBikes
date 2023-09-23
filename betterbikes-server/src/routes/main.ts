import { authRoutes } from "./auth.route"
import { DashboardRoutes } from "./dashboard.route"
import { vehiclePostRoutes } from "./vehiclepost.route"
import { BookingRoutes } from "./booking.route"

export const appRoutes = (app:any) => {
    authRoutes(app)
    vehiclePostRoutes(app)
    DashboardRoutes(app)
    BookingRoutes(app)
}