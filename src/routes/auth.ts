import express from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth";
import { validateFields } from "../middlewares/validateFields";

const router = express.Router();

router.post("/login",[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password id required').not().isEmpty(),
    validateFields
] ,login)

export default router