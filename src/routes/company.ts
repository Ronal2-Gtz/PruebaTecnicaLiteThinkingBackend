import express from "express";
import { check } from "express-validator";
import {
  addCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from "../controllers/company";
import { findCompanyById, validateFields } from "../middlewares/db-validators";

const router = express.Router();

router.get("/:id", getCompany);

router.get("/", getCompanies);

router.post("/",[
  check('name', 'The name is required').not().isEmpty(),
  check('address', 'The address is required').not().isEmpty(),
  check('nit', 'The nit is required').not().isEmpty(),
  check('phone', 'The cell phone number is required').not().isEmpty(),
  validateFields
], addCompany);

router.put("/:id",[
  check('id', 'Id is invalid').isMongoId(),
  check('id').custom(findCompanyById),
  validateFields
] ,updateCompany);

router.delete("/:id", [
  check('id', 'Id is invalid').isMongoId(),
  check('id').custom(findCompanyById),
  validateFields
],deleteCompany);

export default router;
