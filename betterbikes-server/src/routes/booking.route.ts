import { validateToken } from "../middleware/validateToken";
import { AcceptBookingRequest, BookVehicle } from "../controller/booking.controller";
import { Router } from "express";
const router = Router()

router.post("/book-vehicle",validateToken, BookVehicle)
router.post("/accept-booking-request/:id",validateToken, AcceptBookingRequest)


export const BookingRoutes = router

