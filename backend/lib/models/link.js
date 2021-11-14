"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    url: { type: "string", required: true, unique: true },
    target: { type: "string", required: true },
    owner: { type: "string", required: true },
    uses: { type: "number", required: true, default: -1 },
    tracking: { type: "boolean", required: true, default: false }
});
const linkModel = (0, mongoose_1.model)("link", linkSchema);
exports.default = linkModel;
