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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExists = exports.findCompanyById = void 0;
const CompanySchema_1 = __importDefault(require("../model/CompanySchema"));
const UserSchema_1 = __importDefault(require("../model/UserSchema"));
const findCompanyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield CompanySchema_1.default.findById(id);
    if (!company) {
        throw new Error(`Id does not exist ${id} `);
    }
});
exports.findCompanyById = findCompanyById;
const emailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield UserSchema_1.default.findOne({ email });
    if (existeEmail) {
        throw new Error(`The email: ${email} already registered `);
    }
});
exports.emailExists = emailExists;
