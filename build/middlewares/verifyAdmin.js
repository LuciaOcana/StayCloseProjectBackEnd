"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const AdminValidation = (req, res, next) => {
    console.log('Verifying Admin');
    try {
        //Recollim les dades del payload del token
        const admin = req.user.admin;
        if (admin != true) {
            return res.json('Ypu are not an Admin');
        }
        return next();
    }
    catch (_a) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
    }
};
exports.AdminValidation = AdminValidation;
