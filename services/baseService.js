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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
// src/services/BaseService.ts
const client_1 = require("@prisma/client");
class BaseService {
    constructor(model) {
        this.prisma = new client_1.PrismaClient();
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create({ data });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findUnique({ where: { id } });
        });
    }
    findOneByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findUnique({ where: { uuid } });
        });
    }
    getAll(filters_1, orderBy_1) {
        return __awaiter(this, arguments, void 0, function* (filters, orderBy, page = 1, pageSize = 10) {
            const skip = (page - 1) * pageSize;
            const [totalCount, results] = yield Promise.all([
                this.model.count({ where: filters }),
                this.model.findMany({
                    where: filters,
                    orderBy: orderBy,
                    skip: skip,
                    take: pageSize,
                })
            ]);
            return { totalCount, results };
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update({
                where: { id },
                data
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.update({ where: { id },
                data: { deletedAt: new Date(),
                    isActive: false }
            });
        });
    }
    deactivate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update({
                where: { id },
                data: { isActive: false }
            });
        });
    }
    activate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update({
                where: { id },
                data: { isActive: true }
            });
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=baseService.js.map