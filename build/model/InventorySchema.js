"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InventorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: [true, 'The name is required'],
        unique: true
    },
    commentary: {
        type: String,
        require: [true, 'The commentary is required']
    },
    stock: {
        type: Number,
        require: [true, 'The stock is required']
    },
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});
exports.default = (0, mongoose_1.model)("Inventory", InventorySchema);
