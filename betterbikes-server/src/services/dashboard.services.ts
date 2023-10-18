import { IRegisteredUser } from "../interfaces/user";
import {prisma} from "../config/prisma";

const MAX_VEHICLE_POSTS = 4
const MAX_BOOKING_POSTS = 6



export const getDashboardData = async(
    userId: string,
    currentPage: number
) =>{
    try{
        if(!userId){
            throw new Error("User not found")
        }
        const count = await prisma.vehiclePost.count({
            where:{
                user_id: userId
            }
        })
        const pages = Math.ceil(count/MAX_VEHICLE_POSTS)
        const previousPage = currentPage > 1 ? `/?page=${currentPage-1}` : null
        const nextPage = currentPage < pages ? `/?page=${currentPage+1}` : null

        const vehiclePosts = await prisma.vehiclePost.findMany({
            take: MAX_VEHICLE_POSTS,
            skip: (currentPage - 1) * MAX_VEHICLE_POSTS,
            where:{
                user_id: userId
            },
        })

        const bookingRequests = await prisma.booking.count({
            where:{
                vehicle_post:{
                    user_id: userId
                },
            }
        })

        const vehicleDataCount =async (type: string) => {
            return prisma.vehiclePost.count({
                where:{
                    user_id: userId,
                    vehicle_type: type
                }
            })
        }

        const bikeVehicleData = await vehicleDataCount("Bike")
        const scooterVehicleData = await vehicleDataCount("Scooter")

        //data for booking by type pending, accepted, rejected

        const bookingStatusData = async (status: string) => {
            return prisma.booking.count({
                where:{
                    vehicle_post:{
                        user_id: userId
                    },
                    status: status
                }
            })
        }

        const pendingBookingData = await bookingStatusData("pending")
        const acceptedBookingData = await bookingStatusData("accepted")
        const rejectedBookingData = await bookingStatusData("rejected")

        const earnings = await prisma.booking.aggregate({
            where:{
                vehicle_post:{
                    user_id: userId
                },
                status: "accepted"
            },
            _sum:{
                total_price: true
            }
        })

        const earningData = async (status: string) => {
            return prisma.booking.aggregate({
                where:{
                    vehicle_post:{
                        user_id: userId
                    },
                    status: status
                },
                _sum:{
                    total_price: true
                }
            })
        }

        const pendingEarnings = await earningData("pending")
        const acceptedEarnings = await earningData("accepted")


        return {
            vehiclesCount: count,
            bookingCount: bookingRequests,
            earnings: earnings._sum?.total_price ? earnings._sum?.total_price : 0,
            pages,
            previousPage,
            nextPage,
            vehiclePosts,
            vehicleData: {
                bike: bikeVehicleData,
                scooter: scooterVehicleData
            },
            bookingData: {
                pending: pendingBookingData,
                accepted: acceptedBookingData,
                rejected: rejectedBookingData
            },
            earningsData: {
                pending: pendingEarnings._sum?.total_price ? pendingEarnings._sum?.total_price : 0,
                accepted: acceptedEarnings._sum?.total_price ? acceptedEarnings._sum?.total_price : 0,
            }
        }
    }
    catch(err){
        throw err
    }
}

export const getMyBookingRequests = async(
    userId: string,
    currentPage: number
) =>{
    try{
        //from the user id get the vehicle posts which have booking requests
        const count = await prisma.booking.count({
            where:{
                vehicle_post:{
                    user_id: userId
                },
                // status: "pending"
            }
        })


        const pages = Math.ceil(count/MAX_BOOKING_POSTS)
        const previousPage = currentPage > 1 ? `/?page=${currentPage-1}` : null
        const nextPage = currentPage < pages ? `/?page=${currentPage+1}` : null
        const bookingRequests = await prisma.booking.findMany({
            take: MAX_BOOKING_POSTS,
            skip: (currentPage - 1) * MAX_BOOKING_POSTS,
            where:{
                vehicle_post:{
                    user_id: userId
                },
            },
            select:{
                booking_id: true,
                start_date: true,
                end_date: true,
                vehicle_post_id: true,
                status: true,
                vehicle_post:{
                    select:{
                        vehicle_name: true,
                        vehicle_image: true,
                        vehicle_price: true,
                        vehicle_type: true,
                        created_at: true,
                        vehicle_brand: true,
                        vehicle_number: true,
                    }
                }
            }
        })
        return {
            bookingRequests,
            pages,
            previousPage,
            nextPage
        }
    }catch(err){
        throw err
    }
}
