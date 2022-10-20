import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import User, { UserType } from '../model/UserSchema';

type IGetUserAuthInfoRequest  = Request & {
    user: UserType
}

const validateJwt = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('authorization')

    if (!token) {
        res.status(404).json({
            message: 'The request has no token'
        })
        return
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY!) as { uid: string }
        const user = await User.findById(uid) as UserType
        if(!user){
            res.status(404).json({
                message: 'invalid token - user does not exist in DB'
            })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(404).json('invalid token')
    }

}

export { validateJwt }