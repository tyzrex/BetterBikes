import {prisma} from "../config/prisma"

export const checkAlreadyRegistered= async (email: string) => {
 try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return {
        user,
        oAuthUser: null,
        status: true,
      };
    }

    const oAuthUser = await prisma.oAuthUser.findUnique({
      where: {
        email: email,
      },
    });

    if (oAuthUser) {
      return {
        user: null,
        oAuthUser,
        status: true,
      };
    } else {
      return {
        status: false,
      };
    }
  }
    catch(err:any){
        console.log(err)
    }
}