import { CredentialLoginUser, GoogleLoginUser, RefreshToken, RegisterUser } from "../controller/auth.controller"
import { Router } from "express"

const router = Router()

router.post("/register", RegisterUser)
router.post("/login/credentials", CredentialLoginUser)
router.post("/login/google",GoogleLoginUser)
router.post("/refresh-token", RefreshToken)

export const authRoutes = router

