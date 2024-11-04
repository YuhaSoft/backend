"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const EntityType_1 = require("../enums/EntityType");
const baseModel_1 = require("./baseModel");
class Image extends baseModel_1.BaseModel {
    constructor(data) {
        super(data);
        this.type = EntityType_1.EntityType.USER;
        this.url = data.url;
        this.fileType = data.fileType;
        this.fileSize = data.fileSize;
        this.width = data.width;
        this.height = data.height;
    }
}
exports.Image = Image;
//# sourceMappingURL=imageModel.js.map