"use strict";
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
exports.ImageController = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const response_1 = __importDefault(require("../global/response"));
class ImageController {
    downloadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = req.params.path;
                const fullPath = path_1.default.join(__dirname, process.env.IMAGESPATH + "", filePath); // Adjust the path to your uploads directory
                if (fs_1.default.existsSync(fullPath)) {
                    res.sendFile(fullPath);
                }
                else {
                    res.json(response_1.default.error("Image Not Found ", null, 404));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=imageController.js.map