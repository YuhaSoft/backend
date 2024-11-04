"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const constants_1 = require("../config/constants");
const custom_errors_1 = require("../../lib/custom-errors");
const logger_1 = require("../../lib/logger");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const middlewares = {
    handleRequestError(error, req, res, next) {
        const logger = new logger_1.Logger();
        switch (true) {
            case (error instanceof custom_errors_1.NotFoundException):
                res.status(constants_1.NOT_FOUND_STATUS_CODE).json({
                    success: false, error: constants_1.NOT_FOUND_STATUS_MESSAGE, statusCode: constants_1.NOT_FOUND_STATUS_CODE,
                });
                break;
            case (error instanceof apierror_1.default):
                res.status(constants_1.BAD_REQUEST_STATUS_CODE).json({
                    success: false, error: constants_1.BAD_REQUEST_STATUS_CODE, statusCode: constants_1.BAD_REQUEST_STATUS_CODE, message: error.message, code: error.ErrorID
                });
                break;
            case (error instanceof custom_errors_1.ServerException):
                res.status(constants_1.INTERNAL_SERVER_STATUS_CODE).json({
                    success: false, error: constants_1.INTERNAL_SERVER_MESSAGE, statusCode: constants_1.INTERNAL_SERVER_STATUS_CODE,
                });
                break;
            case (error instanceof custom_errors_1.BadRequestException):
                res.status(constants_1.BAD_REQUEST_STATUS_CODE).json({
                    success: false, error: constants_1.BAD_REQUEST_STATUS_MESSAGE, statusCode: constants_1.BAD_REQUEST_STATUS_CODE,
                });
                break;
            default:
                res.status(constants_1.INTERNAL_SERVER_STATUS_CODE).json({
                    success: false, error: constants_1.INTERNAL_SERVER_MESSAGE, statusCode: constants_1.INTERNAL_SERVER_STATUS_CODE,
                });
            // send email
        }
        logger.log('info', 'Request handle error!!', error);
        res.end();
    },
};
exports.middlewares = middlewares;
//# sourceMappingURL=error.handler.js.map