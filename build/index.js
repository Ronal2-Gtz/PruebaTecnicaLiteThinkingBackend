"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const company_1 = __importDefault(require("./routes/company"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const inventory_1 = __importDefault(require("./routes/inventory"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./database/config");
dotenv_1.default.config();
const PORT = process.env.PORT;
const PATHS = {
    COMPANY_PATH: '/api/company',
    USER_PATH: '/api/user',
    AUTH_PATH: '/api/auth',
    INVENTORY_PATH: '/api/inventory'
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(PATHS.AUTH_PATH, auth_1.default);
app.use(PATHS.COMPANY_PATH, company_1.default);
app.use(PATHS.INVENTORY_PATH, inventory_1.default);
app.use(PATHS.USER_PATH, user_1.default);
(0, config_1.dbConnection)();
app.listen(PORT, () => {
    console.log(`Sever running on port ${PORT}`);
});
