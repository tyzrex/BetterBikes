import { DashboardData } from "../controller/dashboard.controller"
import { validateToken } from "../middleware/validateToken"

export const DashboardRoutes = (app: any) => {
    app.get("/dashboard-data", validateToken, DashboardData)
}