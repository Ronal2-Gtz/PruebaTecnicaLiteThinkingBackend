import express from "express";
import { addUser, getUser } from "../controllers/user";
import { emailExists, findCompanyById, validateFields } from "../middlewares/db-validators";
import { check } from "express-validator";

const router = express.Router();

router.get("/:id", [
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(findCompanyById),
    validateFields
], getUser);

router.post("/", [
    check('email', 'The email is invalid').isEmail(),
    check('password', 'Password must be longer than 6 letters').isLength({ min: 6 }),
    check('name', 'The name is required').not().isEmpty(),
    check('lastName', 'The lastName is required').not().isEmpty(),
    check('email').custom(emailExists),
    validateFields
], addUser);


export default router;