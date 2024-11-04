"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEnum = void 0;
var LogEnum;
(function (LogEnum) {
    LogEnum["Login"] = "User ${req.body.username} attempted to log in.";
    LogEnum["Register"] = "User ${req.body.username} attempted to register.";
    LogEnum["UpdateProfilePhoto"] = "User ${req.updatedUser.username} attempted to update profile Photo.";
    LogEnum["UpdateProfile"] = "User ${req.updatedUser.username} attempted to update profile ${(req.body.email)?'email from  to ' + req.body.email : '' } /n ${(req.body.phoneNumber)?'phone Number changed to ' + req.body.phoneNumber : '' }. ";
    LogEnum["UpdatePassword"] = "User ${req.updatedUser.username} attempted to update Password.";
    LogEnum["UserSelect"] = "User ${req.selectedUser.username} request profile.";
})(LogEnum || (exports.LogEnum = LogEnum = {}));
//# sourceMappingURL=logEnum.js.map