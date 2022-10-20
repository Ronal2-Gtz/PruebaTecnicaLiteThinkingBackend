import express from "express";
import { addInventory, deleteInventory, getInventories, getInventory, updateInventory } from "../controllers/inventory";
import { validateFields } from "../middlewares/validateFields";
import { validateJwt } from "../middlewares/validateJwt";
import { isAdminRole } from "../middlewares/validateRole";
import { check } from "express-validator";

const router = express.Router();

router.get("/:id", getInventory);
router.get("/company/:companyId", getInventories);
router.post("/", [
    validateJwt,
    isAdminRole,
    check('name', 'The name is required').not().isEmpty(),
    check('commentary', 'The commentary is required').not().isEmpty(),
    check('stock', 'The stock is required').not().isEmpty(),
    check('companyId', 'The companyId is required').not().isEmpty(),
    validateFields
] ,addInventory)
router.put("/:id", updateInventory)
router.delete("/:id", deleteInventory)

export default router;