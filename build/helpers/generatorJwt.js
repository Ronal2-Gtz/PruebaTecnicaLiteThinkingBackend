"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generartorJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generartorJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETPRIVATEKEY, { expiresIn: '4h' }, (error, token) => {
            if (error) {
                reject('Error generating token');
                return;
            }
            resolve(token);
        });
    });
};
exports.generartorJWT = generartorJWT;
