"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError extends Error {
    constructor(message, ErrorID, code = null) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = 'api error';
        this.message = message;
        if (ErrorID)
            this.ErrorID = ErrorID;
        if (code)
            this.code = code;
    }
}
exports.default = APIError;
//# sourceMappingURL=apierror.js.map