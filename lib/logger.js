"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const { config } = require('../src/config/environments/' + process.env.ENV);
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
class Logger {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: config.logLevel,
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.simple()),
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
                }),
                new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../../logs/app.log'), level: 'info' }),
            ],
        });
    }
    log(level, ...msg) {
        this.logger.log(level, ...msg);
    }
    getRequestLogger() {
        return (0, express_winston_1.logger)({
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../../logs/app.log'), level: 'info' }),
            ],
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
            meta: process.env.ENV !== 'production',
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
            colorize: false,
            ignoreRoute(req, res) { return false; },
        });
    }
    getRequestErrorLogger() {
        return (0, express_winston_1.errorLogger)({
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../../logs/error.log'), level: 'error' }),
            ],
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        });
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map