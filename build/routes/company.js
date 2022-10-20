"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const company_1 = require("../controllers/company");
const db_validators_1 = require("../helpers/db-validators");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const router = express_1.default.Router();
router.get("/:id", [
    validateJwt_1.validateJwt,
    validateRole_1.isAdminRole,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.findCompanyById),
    validateFields_1.validateFields
], company_1.getCompany);
router.get("/user/:id", company_1.getCompanies);
router.post("/", [
    validateJwt_1.validateJwt,
    validateRole_1.isAdminRole,
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('address', 'The address is required').not().isEmpty(),
    (0, express_validator_1.check)('nit', 'The nit is required').not().isEmpty(),
    (0, express_validator_1.check)('phone', 'The cell phone number is required').not().isEmpty(),
    validateFields_1.validateFields
], company_1.addCompany);
router.put("/:id", [
    validateJwt_1.validateJwt,
    validateRole_1.isAdminRole,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.findCompanyById),
    validateFields_1.validateFields
], company_1.updateCompany);
router.delete("/:id", [
    validateJwt_1.validateJwt,
    validateRole_1.isAdminRole,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.findCompanyById),
    validateFields_1.validateFields
], company_1.deleteCompany);
exports.default = router;
