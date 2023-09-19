import { options } from "@/app/api/auth/[...nextauth]/options";
import { GetRequest } from "@/app/services/httpRequest";
import { serverRequest } from "@/app/services/serverRequest";
import { Session, getServerSession } from "next-auth";

interface Params{
    page?: number
}

export const getDashboardData = async (
    params: Params,
    session: Session | null 
) => {
    try{
        const pageParam = params?.page ? `?page=${params?.page}` : "";
        // const session = await getServerSession(options);
        // const response = await GetRequest(`/dashboard-data/${pageParam}`
        // ,{
        //     headers: {
        //         Authorization: `Bearer ${session?.user.access_token}`
        //     }
        // }
        // );

        const response = await serverRequest(`/dashboard-data/${pageParam}`, "GET", session);
        return response;
    }
    catch(error){
        console.log(error);
    }
}