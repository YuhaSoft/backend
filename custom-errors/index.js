"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerException = exports.NotFoundException = exports.BadRequestException = void 0;
const BadRequestException = class BadRequestException extends Error {
};
exports.BadRequestException = BadRequestException;
const NotFoundException = class NotFoundException extends Error {
};
exports.NotFoundException = NotFoundException;
const ServerException = class ServerException extends Error {
};
exports.ServerException = ServerException;
//# sourceMappingURL=index.js.map