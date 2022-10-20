"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validateFields_1 = require("../middlewares/validateFields");
const router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.check)('email', 'The email is required').isEmail(),
    (0, express_validator_1.check)('password', 'The password id required').not().isEmpty(),
    validateFields_1.validateFields
], auth_1.login);
exports.default = router;
