"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const main_controller_1 = require("../controllers/main_controller");
exports.mainRouter = express_1.default.Router();
exports.mainRouter.get('/hello', main_controller_1.mainController.hello);
