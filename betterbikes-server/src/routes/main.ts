
import { authRoutes } from "./auth.route"

export const appRoutes = (app:any) => {
    authRoutes(app)
}