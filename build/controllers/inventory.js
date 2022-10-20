"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventory = exports.updateInventory = exports.addInventory = exports.getInventories = exports.getInventory = void 0;
const CompanySchema_1 = __importDefault(require("../model/CompanySchema"));
const InventorySchema_1 = __importDefault(require("../model/InventorySchema"));
const getInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const inventory = InventorySchema_1.default.findById(id);
        res.json({
            inventory
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.getInventory = getInventory;
const getInventories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        console.log(companyId);
        const [total, inventories] = yield Promise.all([
            InventorySchema_1.default.countDocuments({ companyId: companyId }),
            InventorySchema_1.default.find({ companyId: companyId })
        ]);
        res.json({
            total,
            inventories
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.getInventories = getInventories;
const addInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, commentary, stock, companyId } = req.body;
        const [inventoryDB, companyBD] = yield Promise.all([
            InventorySchema_1.default.findOne({ name }),
            CompanySchema_1.default.findOne({ companyId })
        ]);
        if (!companyBD) {
            res.status(404).json({
                message: `company does not exist`
            });
            return;
        }
        if (inventoryDB) {
            res.status(404).json({
                message: `The inventory ${inventoryDB.name} already exists`
            });
            return;
        }
        const inventory = new InventorySchema_1.default({ name, commentary, stock: Number(stock), companyId });
        yield inventory.save();
        res.json({
            message: "Inventory create",
            inventory
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.addInventory = addInventory;
const updateInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { _id, companyId } = _a, inventoryUpdate = __rest(_a, ["_id", "companyId"]);
        const newInventory = yield InventorySchema_1.default.findByIdAndUpdate(id, inventoryUpdate);
        res.json({
            message: "Inventory update",
            newInventory
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.updateInventory = updateInventory;
const deleteInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const inventory = yield InventorySchema_1.default.findByIdAndDelete(id);
        res.json({
            message: "Inventory delete",
            inventory
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.deleteInventory = deleteInventory;
