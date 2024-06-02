import { Ret } from "@/objects/Ret";
const express = require('express');

class RouterWrapper {
    private router: any;

    Router() {
        return this.router
    }

    constructor(router) {
        this.router = router;
    }

    get(path: string, handler: any) {
        this.router.get(path, async (req, res, next) => {
            try {
                const result = await handler(req, res)
                res.send(Ret.success(result))
            } catch (e) {
                next(e);
            }
        })
    }

    post(path: string, handler: any) {
        this.router.post(path, async (req, res, next) => {
            try {
                const result = await handler(req, res)
                res.send(Ret.success(result))
            } catch (e) {
                next(e);
            }
        })
    }
}

export const createRouter = () => new RouterWrapper(express.Router());
