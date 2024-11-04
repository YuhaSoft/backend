"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorcode_1 = __importDefault(require("./errorcode"));
const ResponseTemplate = {
    general(data) {
        return data;
    },
    successMessage(message) {
        return {
            success: true,
            message
        };
    },
    /**
     * Returns standard success response
     * @param {*} data
     * @param {String} message
     */
    success(data, message) {
        return {
            success: true,
            message,
            data
        };
    },
    error(message, err, code) {
        return {
            success: false,
            message: message || 'some error occurred',
            error: err || 'error occurred on server, please try again after some time.',
            code: code || errorcode_1.default.InternalServerError
        };
    },
    commonAuthUserDataError(data) {
        return ResponseTemplate.error(data.message || 'Authentication error', data.error || 'token verification failed, Please try again', data.code || errorcode_1.default.TokenValidationFailed);
    },
    emptyContent() {
        return ResponseTemplate.error('empty content found', `you must provide valid data and it must not be empty
      ref: http://stackoverflow.com/questions/18419428/what-is-the-minimum-valid-json`, errorcode_1.default.EmptyRequestBody);
    },
    invalidContentType() {
        return ResponseTemplate.error('invalid content type', `you must specify content type and it must be application/json',
      ref: 'http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type`, errorcode_1.default.InvalidContentType);
    },
    BadRequestFromJoi(err) {
        return ResponseTemplate.error(err.message, err.error, err.code || errorcode_1.default.ValidationFailed);
    },
    routeNotFound(req) {
        return ResponseTemplate.error('api not found', `${req.method} ${req.url}`, errorcode_1.default.RouteNotFound);
    },
    userNotFound() {
        return ResponseTemplate.error('user not found', "the user you're looking for doesn't exist or you dont have permissions to access it.", errorcode_1.default.UserNotFound);
    },
    userAlreadyExist() {
        return ResponseTemplate.error('user with email Or Username already exist', 'User with same email already exist in System, please use another email', errorcode_1.default.EmailAlreadyExists);
    },
    userAlreadyInvited() {
        return ResponseTemplate.error('user with email already invited', 'User with same email already invited, Another link can be send after 24 hours window', errorcode_1.default.DuplicateInvite);
    }
};
exports.default = ResponseTemplate;
//# sourceMappingURL=index.js.map