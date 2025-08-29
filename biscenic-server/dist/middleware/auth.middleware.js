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
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "Authentication token is required" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const user = yield user_model_1.default.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        // Assign the entire user document
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
});
exports.protect = protect;
const admin = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            message: 'Authentication required',
            error: true
        });
        return;
    }
    if (req.user.roles.includes('admin')) {
        next();
    }
    else {
        res.status(403).json({
            message: 'Access denied. Admin privileges required.',
            error: true
        });
    }
};
exports.admin = admin;
//# sourceMappingURL=auth.middleware.js.map