import { IRegisteredUser } from "../interfaces/user";
import {prisma} from "../config/prisma";

const MAX_VEHICLE_POSTS = 4

export const getDashboardData = async(
    user: IRegisteredUser,
    currentPage: number
) =>{
    try{
        if(!user){
            throw new Error("User not found")
        }
        const count = await prisma.vehiclePost.count({
            where:{
                authUserId: user?.user?.id as string,
                oauthUserId: user?.oAuthUser?.id as string
            }
        })
        const pages = Math.ceil(count/MAX_VEHICLE_POSTS)
        const previousPage = currentPage > 1 ? `/?page=${currentPage-1}` : null
        const nextPage = currentPage < pages ? `/?page=${currentPage+1}` : null

        const vehiclePosts = await prisma.vehiclePost.findMany({
            take: MAX_VEHICLE_POSTS,
            skip: (currentPage - 1) * MAX_VEHICLE_POSTS,
            where:{
                authUserId: user?.user?.id as string,
                oauthUserId: user?.oAuthUser?.id as string
            }
        })

        const bookingRequests = await prisma.booking.count({
            where:{
                vehicle_post:{
                    authUserId: user?.user?.id as string,
                    oauthUserId: user?.oAuthUser?.id as string
                },
                status: "pending"
            }
        })


        return {
            vehiclesCount: count,
            bookingCount: bookingRequests,
            pages,
            previousPage,
            nextPage,
            vehiclePosts,
        }
    }
    catch(err){
        throw err
    }
}

// export const getBookingData = async(
