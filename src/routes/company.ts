import express from "express";
import { check } from "express-validator";
import {
  addCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from "../controllers/company";
import { findCompanyById } from "../helpers/db-validators";
import {  validateFields } from "../middlewares/validateFields";
import { validateJwt } from "../middlewares/validateJwt";
import { isAdminRole } from "../middlewares/validateRole";

const router = express.Router();

router.get("/:id", [
  validateJwt,
  isAdminRole,
  check('id', 'Id is invalid').isMongoId(),
  check('id').custom(findCompanyById),
  validateFields], getCompany);

router.get("/user/:id", getCompanies);

router.post("/", [
  validateJwt,
  isAdminRole,
  check('name', 'The name is required').not().isEmpty(),
  check('address', 'The address is required').not().isEmpty(),
  check('nit', 'The nit is required').not().isEmpty(),
  check('phone', 'The cell phone number is required').not().isEmpty(),
  validateFields
], addCompany);

router.put("/:id", [
  validateJwt,
  isAdminRole,
  check('id', 'Id is invalid').isMongoId(),
  check('id').custom(findCompanyById),
  validateFields
], updateCompany);

router.delete("/:id", [
  validateJwt,
  isAdminRole,
  check('id', 'Id is invalid').isMongoId(),
  check('id').custom(findCompanyById),
  validateFields
], deleteCompany);

export default router;
