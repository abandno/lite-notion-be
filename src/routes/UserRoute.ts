import {codeSignIn, passwordSignIn, resetPassword, sendVerifyCode} from "@/service/UserService"
import { createRouter } from "./RouterWrapper"

const routerW = createRouter()
export const userRouter = routerW.Router();

routerW.post("/auth/passwordSignIn", async (req, res) => {
    return await passwordSignIn(req.body)
})

routerW.post("/auth/resetPassword", async (req, res) => {
    return await resetPassword(req.body)
})

routerW.post("/auth/sendVerifyCode", async (req, res) => {
    return await sendVerifyCode(req.body)
})

routerW.post("/auth/codeSignIn", async (req, res) => {
    return await codeSignIn(req.body)
})
