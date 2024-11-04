"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const userRoute_1 = __importDefault(require("./userRoute"));
const imageRoute_1 = __importDefault(require("./imageRoute"));
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use('/v1/user', userRoute_1.default);
routes.use('/v1/image', imageRoute_1.default);
//# sourceMappingURL=index.js.map