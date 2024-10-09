"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const main_router_1 = require("./routers/main_router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client/build")));
app.use((0, cors_1.default)());
app.listen(process.env.PORT || 3001, () => {
    console.log(`run on ${process.env.PORT || 3001}`);
});
app.get('/', (req, res) => {
    res.render(path_1.default.resolve(__dirname, "../client/dist", "index.html"));
});
app.use('/api/', main_router_1.mainRouter);
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../client/build", "index.html"));
});
console.log("Node is running");
