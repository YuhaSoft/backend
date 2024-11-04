"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UserController = void 0;
const db_1 = __importDefault(require("../config/db"));
const userService_1 = require("../services/userService");
const baseController_1 = require("./baseController");
const response_1 = __importDefault(require("../global/response"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const custom_errors_1 = require("../../lib/custom-errors");
const SharpService_1 = require("../services/SharpService");
const logEnum_1 = require("../enums/logEnum");
const logger_1 = require("../decorators/logger");
const service = new userService_1.UserService();
class UserController extends baseController_1.BaseController {
    constructor(inpservice) {
        super(inpservice);
        this.create = this.create.bind(this);
        this.findOne = this.findOne.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    register(req, res, next) {
        service
            .register(req.body)
            .then((item) => {
            res.json(response_1.default.success(item, "Register Done"));
        })
            .catch((err) => {
            if (err.meta.target == 'User_username_key') {
                next(new apierror_1.default("Username already exist", err.ErrorID));
            }
            if (err.meta.target == 'User_email_key') {
                next(new apierror_1.default("Email already exist", err.ErrorID));
            }
            if (err.ErrorID == 5200) {
                next(new apierror_1.default(err.message, err.ErrorID));
            }
            next(new apierror_1.default(err.message, err.ErrorID));
        });
    }
    changeProfilePhoto(req, res, next) {
        if (req.file) {
            var width;
            var height;
            SharpService_1.SharpService.getImageDimensions(req.file.path)
                .then((dim) => {
                height = dim.height;
                width = dim.width;
                if (req.file && req.updatedUser && req.updatedUser.id) {
                    db_1.default.image
                        .create({
                        data: {
                            url: req.file.filename,
                            fileSize: req.file.size,
                            fileType: req.file.mimetype,
                            width: width !== null && width !== void 0 ? width : 0,
                            height: height !== null && height !== void 0 ? height : 0,
                        },
                    })
                        .then((image) => __awaiter(this, void 0, void 0, function* () {
                        if (req.updatedUser && req.updatedUser.id)
                            var user = yield db_1.default.user.update({
                                where: { id: req.updatedUser.id },
                                data: { profileImageId: image.id },
                            });
                        res.json(response_1.default.success(null, "profile change success"));
                    }));
                }
            })
                .catch((err) => {
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                if (err.ErrorID == 5200) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new apierror_1.default(err.message, err.ErrorID));
            });
        }
    }
    login(req, res, next) {
        service
            .login(req.body)
            .then((login) => {
            if (login) {
                res.json(response_1.default.success(login, "Login Passed"));
            }
        })
            .catch((err) => {
            if (err.ErrorID == 2110) {
                next(new apierror_1.default("Invalid Credentials", errorcode_1.default.InvalidCredentials));
            }
            if (err.ErrorID == 5200) {
                next(new apierror_1.default("Invalid Credentials", err.InvalidCredentials));
            }
            next(new apierror_1.default("Invalid Credentials", err.InvalidCredentials));
        });
    }
    ChangeProfile(req, res, next) {
        var _a;
        if (req.updatedUser) {
            service
                .updateProfile((_a = req.updatedUser) === null || _a === void 0 ? void 0 : _a.id, req.body)
                .then((profile) => {
                if (profile) {
                    res.json(response_1.default.success(profile, "Profile Updated Done!"));
                }
            })
                .catch((err) => {
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                if (err.ErrorID == 5200) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new apierror_1.default(err.message, err.ErrorID));
            });
        }
    }
    ChangePassword(req, res, next) {
        if (req.updatedUser) {
            service
                .updatePassword(req.updatedUser.username, req.body.oldPass, req.body.newPass)
                .then((profile) => {
                if (profile) {
                    res.json(response_1.default.success(profile, "Password Changed!"));
                }
            })
                .catch((err) => {
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                if (err.ErrorID == 5200) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new apierror_1.default(err.message, err.ErrorID));
            });
        }
    }
    findOne(req, res, next) {
        const uuid = req.params.uuid;
        this.service.findOneByUUIDWithImage(uuid).then(item => {
            if (!item) {
                res.json(response_1.default.error("Not Found!", "", errorcode_1.default.NotFound));
            }
            res.json(response_1.default.success(item, ""));
        }).catch(error => {
            next(new custom_errors_1.ServerException(error.message));
        });
    }
}
exports.UserController = UserController;
__decorate([
    (0, logger_1.logMe)(logEnum_1.LogEnum.Register),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, logger_1.logMe)(logEnum_1.LogEnum.UpdateProfilePhoto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changeProfilePhoto", null);
__decorate([
    (0, logger_1.logMe)(logEnum_1.LogEnum.Login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, logger_1.logMe)(logEnum_1.LogEnum.UpdateProfile),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "ChangeProfile", null);
__decorate([
    (0, logger_1.logMe)(logEnum_1.LogEnum.UpdatePassword),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "ChangePassword", null);
__decorate([
    (0, logger_1.logMe)(logEnum_1.LogEnum.UserSelect),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
//# sourceMappingURL=userController.js.map