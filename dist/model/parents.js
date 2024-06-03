"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parents = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const parentsSchema = new mongoose_1.default.Schema({
    id: { type: String, index: true, unique: true },
    parentDetails: [
        {
            firstName: String,
            lastName: String,
            mob: String,
            parentType: String,
        },
    ],
    device: [
        {
            mob: String,
            owner: String,
            deviceDetails: [
                {
                    platformType: String,
                    token: String,
                    adid: String,
                    sns: String,
                    jwt: String,
                },
            ],
        },
    ],
    address: String,
    createdAt: { type: Date, default: Date.now },
});
exports.parents = mongoose_1.default.models.parents ||
    mongoose_1.default.model("parents", parentsSchema, "parents");
