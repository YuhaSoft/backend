"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
// src/models/BaseModel.ts
const uuid_1 = require("uuid");
const EntityType_1 = require("../enums/EntityType");
class BaseModel {
    constructor(data) {
        Object.assign(this, data);
        this.uuid = (0, uuid_1.v4)();
        this.type = EntityType_1.EntityType.BASE;
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=baseModel.js.map