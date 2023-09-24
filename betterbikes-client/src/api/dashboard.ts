
import { serverProtectedRequest } from "@/app/services/serverRequest";
import { Session} from "next-auth";

interface Params{
    page?: number
}

export const getDashboardData = async (
    params: Params,
    session: Session
) => {


    try{
        const pageParam = params?.page ? `?page=${params?.page}` : "";

        const response = await serverProtectedRequest(`/dashboard-data/${pageParam}`, "GET", session);
        return response;
    }
    catch(error){
        console.log(error);
    }
}


export const getMyBookingRequests = async (
    params: Params,
    session: Session
) => {
    const pageParam = params?.page ? `?page=${params?.page}` : "";
    const response = await serverProtectedRequest(`/dashboard/booking-requests/${pageParam}`, "GET", session);
    return response;
}

