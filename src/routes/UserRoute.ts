import {codeSignIn, sendVerifyCode, signIn} from "@/service/UserService"
import { createRouter } from "./RouterWrapper"

const routerW = createRouter()
export const userRouter = routerW.Router();

routerW.post("/auth/signin", async (req, res) => {
    return await signIn(req.body)
})

routerW.post("/auth/sendVerifyCode", async (req, res) => {
    return await sendVerifyCode(req.body)
})

routerW.post("/auth/codeSignIn", async (req, res) => {
    return await codeSignIn(req.body)
})
