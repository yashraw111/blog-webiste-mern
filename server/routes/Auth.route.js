import express from "express"
import { GoogleLogin, Login, Logout, Register } from "../controller/Auth.controller.js"

const AuthRoute = express.Router()

AuthRoute.post("/register",Register)
AuthRoute.post("/login",Login)
AuthRoute.post("/google-login",GoogleLogin)
AuthRoute.get('/logout', Logout)

export default AuthRoute
