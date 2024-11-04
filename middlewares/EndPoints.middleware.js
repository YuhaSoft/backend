"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPointsActionsMiddleware = EndPointsActionsMiddleware;
function EndPointsActionsMiddleware(endPointsActions) {
    return (req, res, next) => {
        req.Action = endPointsActions;
        next();
    };
}
//# sourceMappingURL=EndPoints.middleware.js.map