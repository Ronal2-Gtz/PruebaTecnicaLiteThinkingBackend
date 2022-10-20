"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CompanySchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: [true, 'The name is required']
    },
    address: {
        type: String,
        require: [true, 'The address is required']
    },
    nit: {
        type: String,
        require: [true, 'The nit is required'],
        unique: true
    },
    phoneNumber: {
        type: Number,
        require: [true, 'The cell phone number is required']
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
exports.default = (0, mongoose_1.model)("Company", CompanySchema);
