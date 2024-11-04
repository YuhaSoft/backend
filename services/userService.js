"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UserService = void 0;
const db_1 = __importDefault(require("../config/db"));
const baseService_1 = require("./baseService");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const bcrypt = __importStar(require("bcryptjs"));
const JWTService_1 = require("../extras/JWTService");
const client_1 = require("@prisma/client");
const userPrisma = new client_1.PrismaClient();
class UserService extends baseService_1.BaseService {
    constructor() {
        super(db_1.default.user);
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure required fields are provided and valid
            if (!data.username || !data.password || !data.email) {
                throw new Error("Username, password, and email are required.");
            }
            // Set default values
            data.isAdmin = false;
            data.password = this.hashPasswordNew(data.password);
            // Include the Image ID in the user data
            const userData = Object.assign({}, data);
            return yield db_1.default.user.create({ data: userData, include: { profileImage: false } });
        });
    }
    hashPassword(pass) {
        if (pass) {
            return bcrypt.hashSync(pass, 8);
        }
        return "";
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword, encPass) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(unencryptedPassword, encPass);
        });
    }
    hashPasswordNew(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    login(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = model;
            const user = yield this.findUser(username, password);
            if (!user) {
                return Promise.reject(new apierror_1.default("Not Found", errorcode_1.default.NotFound));
            }
            yield this.updateUserLastLogin(user);
            const token = JWTService_1.JWTService.generateJWT(user.uuid);
            const login = {
                JWT: token, isAdmin: (user.isAdmin) ? user.isAdmin : false, UUID: user.uuid
            };
            return login;
        });
    }
    findOneByUUIDWithImage(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.default.user.findUnique({ where: { uuid }, include: { profileImage: true } });
            }
            catch (err) {
                throw new apierror_1.default("An error occurred", errorcode_1.default.DatabaseError);
            }
        });
    }
    findUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.default.user.findUnique({ where: { username } });
                if (user) {
                    const isPasswordValid = yield this.checkIfUnencryptedPasswordIsValid(password, user.password);
                    if (isPasswordValid) {
                        return user;
                    }
                    else {
                        throw new apierror_1.default("Incorrect Password", errorcode_1.default.IncorrectCurrPassword);
                    }
                }
                else {
                    throw new apierror_1.default("User not found", errorcode_1.default.UserNotFound);
                }
            }
            catch (err) {
                throw new apierror_1.default(err.message, errorcode_1.default.DatabaseError);
            }
        });
    }
    updateUserLastLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.user.update({
                where: { id: user.id },
                data: { lastLogin: new Date() },
            });
        });
    }
    updateProfile(updatedId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = user;
                const { email, phoneNumber } = user;
                if (!email && !phoneNumber) {
                    return Promise.reject("no data to update!");
                }
                if (!email) {
                    delete updateData.email;
                }
                if (!phoneNumber) {
                    delete updateData.phoneNumber;
                }
                return yield db_1.default.user.update({
                    where: { id: updatedId },
                    data: updateData,
                });
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    getAll(filters_1, orderBy_1) {
        return __awaiter(this, arguments, void 0, function* (filters, orderBy, page = 1, pageSize = 10) {
            const skip = (page - 1) * pageSize;
            const [totalCount, results] = yield Promise.all([
                db_1.default.user.count({ where: filters }),
                db_1.default.user.findMany({
                    where: filters,
                    orderBy: orderBy,
                    skip: skip,
                    take: pageSize,
                    include: { profileImage: true }
                })
            ]);
            return { totalCount, results };
        });
    }
    updatePassword(username, oldPass, newPass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findUser(username, oldPass);
                if (!user) {
                    return Promise.reject(new apierror_1.default("Old Password Not Valid !", errorcode_1.default.IncorrectCurrPassword));
                }
                yield db_1.default.user.update({ where: { id: user.id }, data: { password: this.hashPasswordNew(newPass) } });
                return true;
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map