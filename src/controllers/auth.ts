import { Request, Response } from "express";
import User, { UserType } from "../model/UserSchema";
import bcryptjs from 'bcryptjs';
import { generartorJWT } from "../helpers/generatorJwt";

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email}) as UserType
        if(!user){
            res.status(404).json({
                message: 'User / Password is invalid 1'
            })
            return
        }

        const validPassword = bcryptjs.compareSync(password, user.password)

        if(!validPassword){
            res.status(404).json({
                message: 'User / Password is invalid 2'
            })
            return
        }

        const token = await generartorJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }

  
}

export {login}