import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "@/constants";
import {SmsClient} from "@/service/aliyun/sms";
import {randomNumber} from "@/utils";
import {CACHE} from "@/cache";
import {TipError} from "@/utils/exceptions";

function generateToken(payload: object, secret: string, expiresIn: string | number) {
    return jwt.sign(payload, secret, { expiresIn });
}

export async function signIn({ username, password }) {
    console.log("signIn", username, password);
    const user = { userId: '123', nickname: 'John Doe', phone: '189', avatar: "abc.png" };
    return {
        user,
        accessToken: generateToken(user, JWT_SECRET, '10s'),
        refreshToken: generateToken(user, JWT_SECRET, '30s'),
    }
}

export async function sendVerifyCode({ phone }) {
    // 随机4位验证码
    const code = randomNumber(4)
    CACHE.set("verifyCode:" + phone, code, 60 * 30)
    console.log("sendVerifyCode", phone, code);
    return await SmsClient.invoke(phone, code);
}

// 验证码登录
export async function codeSignIn({ phone, code }) {
    const cacheCode = CACHE.get("verifyCode:" + phone)
    if (cacheCode != code) {
        throw new TipError("验证码错误")
    }
    const user = { userId: '123', nickname: 'John Doe', phone: '189', avatar: "abc.png" };
    return {
        user,
        accessToken: generateToken(user, JWT_SECRET, '10s'),
        refreshToken: generateToken(user, JWT_SECRET, '30s'),
    }
}
