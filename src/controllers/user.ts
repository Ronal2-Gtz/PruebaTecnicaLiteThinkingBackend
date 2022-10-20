import { Request, Response } from "express";
import User from "../model/UserSchema";
import bcryptjs from 'bcryptjs'

const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.json({
            user
        });
    } catch (error) {
        res.status(404).json({
            err: error,
        });
    }

}

const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, rol, name, lastName } = req.body
        const user = new User({ email, password, rol, name, lastName })

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt)

        await user.save()

        res.json({
            message: 'User create',
            user
        });
    } catch (error) {
        res.status(404).json({
            err: error,
        });
    }
}

export { getUser, addUser }