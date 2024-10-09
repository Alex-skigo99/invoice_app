"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainController = void 0;
exports.mainController = {
    hello: (req, res) => { res.status(200).json({ message: 'Hello from My API!' }); },
};
