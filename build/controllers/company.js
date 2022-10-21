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
exports.getAllCompanies = exports.deleteCompany = exports.updateCompany = exports.addCompany = exports.getCompanies = exports.getCompany = void 0;
const CompanySchema_1 = __importDefault(require("../model/CompanySchema"));
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const company = yield CompanySchema_1.default.findById(id);
        res.json({
            company
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.getCompany = getCompany;
const getAllCompanies = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [total, companies] = yield Promise.all([
            CompanySchema_1.default.countDocuments({}),
            CompanySchema_1.default.find({})
        ]);
        res.json({
            total,
            companies
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.getAllCompanies = getAllCompanies;
const getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const [total, companies] = yield Promise.all([
            CompanySchema_1.default.countDocuments({ userId: user._id }),
            CompanySchema_1.default.find({ userId: user._id })
        ]);
        res.json({
            total,
            companies
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.getCompanies = getCompanies;
const addCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, nit, phone } = req.body;
        const companyDB = yield CompanySchema_1.default.findOne({ nit });
        if (companyDB) {
            res.status(404).json({
                err: `The company ${companyDB.name} already exists, please add new NIT`,
            });
            return;
        }
        const company = new CompanySchema_1.default({ name, address, nit, phone, userId: req.user._id });
        yield company.save();
        res.json({
            message: "Company create",
            company
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.addCompany = addCompany;
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { _id, nit } = _a, companyUpdate = __rest(_a, ["_id", "nit"]);
        const company = yield CompanySchema_1.default.findByIdAndUpdate(id, companyUpdate);
        res.json({
            message: "Company update",
            company
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.updateCompany = updateCompany;
const deleteCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const company = yield CompanySchema_1.default.findByIdAndDelete(id);
        res.json({
            message: "Company delete",
            company
        });
    }
    catch (error) {
        res.status(404).json({
            err: error,
        });
    }
});
exports.deleteCompany = deleteCompany;
