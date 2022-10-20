import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator'

const validateFields = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(404).json(errors)
        return
    }

    next()
}



export {
    validateFields,
}