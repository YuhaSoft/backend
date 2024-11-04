"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const EndPoints_middleware_1 = require("../middlewares/EndPoints.middleware");
const EndPointsActions_1 = require("../enums/EndPointsActions");
const adminAuth_middleware_1 = require("../middlewares/adminAuth.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_1 = __importDefault(require("multer"));
const userService_1 = require("../services/userService");
const uploadService_1 = require("../services/uploadService");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new userService_1.UserService();
const Controller = new userController_1.UserController(Service);
router.get('/', (0, EndPoints_middleware_1.EndPointsActionsMiddleware)(EndPointsActions_1.EndPointsActions.SELECT), adminAuth_middleware_1.adminAuthMiddleware, Controller.getAll);
router.get('/:uuid', (0, EndPoints_middleware_1.EndPointsActionsMiddleware)(EndPointsActions_1.EndPointsActions.SELECT), auth_middleware_1.authMiddleware, Controller.findOne);
router.post('/login', (0, EndPoints_middleware_1.EndPointsActionsMiddleware)(EndPointsActions_1.EndPointsActions.OTHER), upload.none(), Controller.login);
router.post('/register', (0, EndPoints_middleware_1.EndPointsActionsMiddleware)(EndPointsActions_1.EndPointsActions.ADD), upload.none(), Controller.register);
router.patch('/change-password', (0, EndPoints_middleware_1.EndPointsActionsMiddleware)(EndPointsActions_1.EndPointsActions.UPDATE), auth_middleware_1.authMiddleware, upload.none(), Controller.ChangePassword);
router.patch('/change-profile', (0, EndPoints_middleware_1.EndPointsActionsMiddleware)(EndPointsActions_1.EndPointsActions.UPDATE), auth_middleware_1.authMiddleware, upload.none(), Controller.ChangeProfile);
router.post('/upload-profile-image', (0, EndPoints_middleware_1.EndPointsActionsMiddleware)(EndPointsActions_1.EndPointsActions.UPDATE), auth_middleware_1.authMiddleware, uploadService_1.uploadProfileImage, uploadService_1.handleUpload, Controller.changeProfilePhoto);
exports.default = router;
//# sourceMappingURL=userRoute.js.map