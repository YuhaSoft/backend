"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMe = logMe;
const logger_1 = require("../../lib/logger");
const logger = new logger_1.Logger();
function logMe(logMessage) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const req = args[0];
            const res = args[1];
            const next = args[2];
            // Eval method to process template literals in logMessage
            const evalLogMessage = (message, req) => {
                return message.replace(/\${(.*?)}/g, (_, g) => eval(g));
            };
            // Logging the message
            logger.log('info', evalLogMessage(logMessage, req));
            return originalMethod.apply(this, args);
        };
    };
}
//# sourceMappingURL=logger.js.map