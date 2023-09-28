import { validateToken } from "../middleware/validateToken";
import { BookVehicle } from "../controller/booking.controller";
import { Router } from "express";
const router = Router()

router.post("/book-vehicle",validateToken, BookVehicle)


export const BookingRoutes = router

