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
exports.BaseController = void 0;
const response_1 = __importDefault(require("../global/response"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const custom_errors_1 = require("../../lib/custom-errors");
class BaseController {
    constructor(service) {
        this.service = service;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.service.create(req.body);
                res.json({ success: true, data: item });
            }
            catch (error) {
                next(new custom_errors_1.ServerException(error.message));
            }
        });
    }
    findOne(req, res, next) {
        const id = parseInt(req.params.id, 10);
        this.service.findOne(id).then(item => {
            if (!item) {
                res.json(response_1.default.error("Not Found!", "", errorcode_1.default.NotFound));
            }
            res.json(response_1.default.success(item, ""));
        }).catch(error => {
            next(new custom_errors_1.ServerException(error.message));
        });
    }
    getAll(req, res, next) {
        const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
        const orderBy = req.query.orderBy ? JSON.parse(req.query.orderBy) : {};
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        this.service.getAll(filters, orderBy, page, pageSize).then(items => {
            res.json(response_1.default.success(items, ""));
        }).catch(error => {
            next(new custom_errors_1.ServerException(error.message));
        });
    }
    update(req, res, next) {
        const id = parseInt(req.params.id, 10);
        this.service.update(id, req.body).then(item => {
            res.json(response_1.default.success(item, ""));
        }).catch(error => {
            next(new custom_errors_1.ServerException(error.message));
        });
    }
    delete(req, res, next) {
        const id = parseInt(req.params.id, 10);
        this.service.delete(id).then(() => {
            res.json(response_1.default.success("", "Deleted!"));
        }).catch(error => {
            next(new custom_errors_1.ServerException(error.message));
        });
    }
    deactivate(req, res, next) {
        const id = parseInt(req.params.id, 10);
        this.service.deactivate(id).then(item => {
            res.json(response_1.default.success(item, "Deactivate Done!"));
        }).catch(error => {
            next(new custom_errors_1.ServerException(error.message));
        });
    }
    activate(req, res, next) {
        const id = parseInt(req.params.id, 10);
        this.service.activate(id).then(item => {
            res.json(response_1.default.success(item, "Activate Done!"));
        }).catch(error => {
            next(new custom_errors_1.ServerException(error.message));
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=baseController.js.map