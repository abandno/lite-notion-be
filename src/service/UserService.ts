import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "@/constants";
import {SmsClient} from "@/service/aliyun/sms";
import {randomNickname, randomNumber} from "@/utils";
import {CACHE} from "@/cache";
import {TipError} from "@/utils/exceptions";
import User from "@/database/models/User";
import CryptoJS from "crypto-js";

function generateToken(payload: object, secret: string, expiresIn: string | number) {
    return jwt.sign(payload, secret, { expiresIn });
}

export async function passwordSignIn({username, password }) {
    console.log("passwordSignIn", username, password);
    // 暂仅 phone
    const userInfo = await User.findOne({where: { phone: username }})
    if (userInfo == null) {
        throw new TipError("用户不存在");
    }

    // 比对密码
    let dbPassword = userInfo.password;
    if (!dbPassword) {
        throw new TipError("暂无密码, 请先设置密码")
    }

    const split = dbPassword.split(":");
    const derivedKey = CryptoJS.PBKDF2(password, split[2], {
        keySize: 8,
        // iterations: 100000,
        iterations: split[0],
        hasher: CryptoJS.algo.SHA512
    }).toString(CryptoJS.enc.Base64);
    if (derivedKey != split[1]) {
        throw new TipError("密码错误");
    }

    const userJwt = { id: userInfo.id, nickname: userInfo.nickname, avatar: userInfo.avatar };

    return {
        user: userJwt,
        accessToken: generateToken(userJwt, JWT_SECRET, '10s'),
        refreshToken: generateToken(userJwt, JWT_SECRET, '30s'),
    }
}

export async function resetPassword({phone, code, password}) {
    const cacheCode = CACHE.get(`VerifyCode:ResetPassword:${phone}`)
    if (cacheCode != code) {
        // TODO throw new TipError("验证码错误")
    }

    // 如果新 phone, 自动注册为新手机用户; 然后, 重置密码(即初次设置密码)
    const userInfo = await createPhoneUserIfNone(phone);

    const t = new Date().getTime()
    const iterations = 1000
    const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64); // 生成随机的盐值
    const derivedKey = CryptoJS.PBKDF2(password, salt, {
        keySize: 8,
        // iterations: 100000,
        iterations,
        hasher: CryptoJS.algo.SHA512
    }).toString(CryptoJS.enc.Base64);
    console.log(`pbkdf2 cost ${new Date().getTime() - t}ms`)

    const passwordHash = `${iterations}:${derivedKey}:${salt}`

    // 更新密码
    await User.update({ password: passwordHash }, {
        where: {
            id: userInfo.id
        }
    })
}

export async function sendVerifyCode({ phone, type }) {
    if (!phone) {
        return
    }
    // 随机4位验证码
    const code = randomNumber(4)
    CACHE.set(`VerifyCode:${type}:${phone}`, code, 60 * 30)
    console.log("sendVerifyCode", phone, code);
    return await SmsClient.invoke(phone, code);
}

// 验证码登录
export async function codeSignIn({ phone, code }) {
    const cacheCode = CACHE.get(`VerifyCode:PhoneLogin:${phone}`)
    if (cacheCode != code) {
        // TODO throw new TipError("验证码错误")
    }

    // 根据 phone 查询 User, 无则新增
    let userInfo = null;
    userInfo = await createPhoneUserIfNone(phone);
    console.log("userInfo", userInfo);
    const userJwt = { id: userInfo.id, nickname: userInfo.nickname, avatar: userInfo.avatar };
    return {
        user: userJwt,
        accessToken: generateToken(userJwt, JWT_SECRET, '10s'),
        refreshToken: generateToken(userJwt, JWT_SECRET, '30s'),
    }
}

/**
 * 如果不存在, 自动新增手机用户
 * @param phone
 */
async function createPhoneUserIfNone(phone) {
    let ret = await User.findOne({where: {phone}})
    if (!ret) {
        ret = await User.create({
            phone,
            nickname: randomNickname(phone)
        });
        console.log(`新增 phone user: ${ret}`);
    }
    return ret;
}
