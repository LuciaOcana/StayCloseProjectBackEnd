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
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handle_1 = require("../utils/error.handle");
const TokenValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Verifying token');
    //Recollim token de la header
    const token = req.header('auth-token');
    //Comporbem la validesa del token
    if (!token)
        return (0, error_handle_1.handleHttp)(res, 'Access denied', 'No token provided');
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET || 'token');
        req.user = payload;
        next();
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'Your token is not valid', error);
    }
});
exports.TokenValidation = TokenValidation;
