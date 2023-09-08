import { CredentialLoginUser, GoogleLoginUser, RegisterUser } from "../controller/auth.controller"

export const authRoutes = (app: any) => {
    app.post("/auth/register", RegisterUser)
    app.post("/auth/login/credentials", CredentialLoginUser)
    app.post("/auth/login/google",GoogleLoginUser)
}