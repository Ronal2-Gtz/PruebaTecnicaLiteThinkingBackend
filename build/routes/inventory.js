"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventory_1 = require("../controllers/inventory");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get("/:id", inventory_1.getInventory);
router.get("/company/:companyId", inventory_1.getInventories);
router.post("/", [
    validateJwt_1.validateJwt,
    validateRole_1.isAdminRole,
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('commentary', 'The commentary is required').not().isEmpty(),
    (0, express_validator_1.check)('stock', 'The stock is required').not().isEmpty(),
    (0, express_validator_1.check)('companyId', 'The companyId is required').not().isEmpty(),
    validateFields_1.validateFields
], inventory_1.addInventory);
router.put("/:id", inventory_1.updateInventory);
router.delete("/:id", inventory_1.deleteInventory);
exports.default = router;
