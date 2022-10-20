"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminRole = void 0;
const isAdminRole = (req, res, next) => {
    if (!req.user) {
        res.status(500).json({
            message: 'token validation is required'
        });
        return;
    }
    const { rol, name } = req.user;
    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            message: `${name} is not adming`
        });
        return;
    }
    next();
};
exports.isAdminRole = isAdminRole;
