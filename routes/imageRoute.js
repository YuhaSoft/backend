"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const router = (0, express_1.Router)();
const imageController = new imageController_1.ImageController();
router.get('/profile/:path', imageController.downloadImage);
exports.default = router;
//# sourceMappingURL=imageRoute.js.map