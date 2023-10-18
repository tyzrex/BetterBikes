import { IRegisteredUser } from "../interfaces/user";
import { prisma } from "../config/prisma";

interface Booking{
    vehicle_post_id: string;
    start_date: Date;
    end_date: Date;
    auth_user_id?: string;
    oauth_user_id?: string;
    total_price: number;
    user: string;
}

export const createBooking = async (
    props : Booking
) =>{
    try{
        const booking = await prisma.booking.create({
            data:{
                vehicle_post_id: props.vehicle_post_id,
                start_date: props.start_date,
                end_date: props.end_date,
                total_price: props.total_price,
                user_id: props.user,
                status: "pending"
            }
        })
        return booking;

    }catch(err){
        throw err;
    }
}

export const checkAlreadyBooked = async (
    vehicle_post_id: string,
    start_date: Date,
    end_date: Date
) => {
    try{
        const booking = await prisma.booking.findFirst({
            //check if the vehicle is already booked in the given date range
            where:{
                vehicle_post_id: vehicle_post_id,
                start_date: {
                    lte: end_date
                },
                end_date: {
                    gte: start_date
                }
            },
            select:{
                booking_id: true
            }
        })
        return {
            status: booking ? true : false,
            booking_id: booking ? booking.booking_id : null
        }
    }catch(err){
        throw err;
    }
}

export const checkOwner = async (
    userId: string,
    vehicle_post_id: string
) => {
    try{
        const vehicle = await prisma.vehiclePost.findFirst({
            where:{
                vehicle_post_id: vehicle_post_id,
                user_id: userId
            },
            select:{
                vehicle_post_id: true
            }
        })
        return vehicle ? true : false
    }catch(err){
        throw err;
    }
}