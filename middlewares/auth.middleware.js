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
exports.authMiddleware = void 0;
const apierror_1 = __importDefault(require("../global/response/apierror"));
const JWTService_1 = require("../extras/JWTService");
const userService_1 = require("../services/userService");
const EndPointsActions_1 = require("../enums/EndPointsActions");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        // //////console.log(token);
        if (!token) {
            return res.status(401).json(new apierror_1.default("Unauthorized", 401));
        }
        const decoded = JWTService_1.JWTService.decryptJWT(token);
        const userUUID = decoded.userUUID;
        if (!userUUID) {
            return res.status(401).json(new apierror_1.default("Unauthorized", 401));
        }
        const userService = new userService_1.UserService();
        const user = yield userService.findOneByUUID(userUUID);
        if (!user) {
            return res.status(401).json(new apierror_1.default("Unauthorized", 401));
        }
        if (!user.isActive) {
            return res.status(401).json(new apierror_1.default("Unauthorized", 401));
        }
        if (Object.is(req.Action, EndPointsActions_1.EndPointsActions.ADD)) {
            req.createdUser = user;
        }
        else if (Object.is(req.Action, EndPointsActions_1.EndPointsActions.UPDATE)) {
            req.updatedUser = user;
        }
        else if (Object.is(req.Action, EndPointsActions_1.EndPointsActions.DELETE)) {
            req.deletedUser = user;
        }
        else if (Object.is(req.Action, EndPointsActions_1.EndPointsActions.SELECT)) {
            req.selectedUser = user;
        }
        next();
    }
    catch (err) {
        if (err.message === "Cannot read properties of null (reading 'userUUID')") {
            return res.status(401).json(new apierror_1.default("Unauthorized", 401));
        }
        console.error("Error in authMiddleware:", err);
        return res.status(500).json(new apierror_1.default("Internal Server Error", 500));
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map