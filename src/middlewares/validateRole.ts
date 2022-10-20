import { NextFunction, Request, Response } from "express";
import { UserType } from "../model/UserSchema";

type IGetUserAuthInfoRequest = Request & {
    user: UserType
}

const isAdminRole = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.status(500).json({
            message: 'token validation is required'
        })
        return
    }

    const { rol, name } = req.user

    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            message: `${name} is not adming`
        })
        return
    }

    next()
}

export { isAdminRole }