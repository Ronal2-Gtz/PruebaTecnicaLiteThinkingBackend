"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validateFields_1 = require("../middlewares/validateFields");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const router = express_1.default.Router();
router.get("/:id", [
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.findCompanyById),
    validateFields_1.validateFields
], user_1.getUser);
router.post("/", [
    (0, express_validator_1.check)('email', 'The email is invalid').isEmail(),
    (0, express_validator_1.check)('password', 'Password must be longer than 6 letters').isLength({ min: 6 }),
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('lastName', 'The lastName is required').not().isEmpty(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailExists),
    validateFields_1.validateFields
], user_1.addUser);
exports.default = router;
