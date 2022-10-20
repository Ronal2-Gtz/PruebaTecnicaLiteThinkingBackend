import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator'
import Company from "../model/CompanySchema";
import User from "../model/UserSchema";

const validateFields = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(404).json(errors)
        return
    }

    next()
}

const findCompanyById = async (id: string): Promise<void> => {
    const company = await Company.findById(id)

    if (!company) {
        throw new Error(`Id does not exist ${id} `)
    }
}

const emailExists = async (email: string) => {
    const existeEmail = await User.findOne({ email });
    
    if (existeEmail) {
        throw new Error(`The email: ${email} already registered `);
    }
}

export {
    validateFields,
    findCompanyById,
    emailExists
}