"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.listen(port, () => console.log(`API RODANDO NA PORTA: ${port} `));
app.get("/", (req, res) => res.status(200).send({ message: "HELLO WORLD" }));
//# sourceMappingURL=server.js.map