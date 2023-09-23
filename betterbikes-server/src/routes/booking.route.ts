import { validateToken } from "../middleware/validateToken";
import { BookVehicle } from "../controller/booking.controller";

export const BookingRoutes = (app: any) => {
    app.post("/vehicle/book-vehicle",validateToken, BookVehicle)
}

