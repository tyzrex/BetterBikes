"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const socket_io_1 = require("socket.io");
const errorHandler_1 = require("./middleware/errorHandler");
const main_1 = __importDefault(require("./routes/main"));
const socket_1 = require("./socket");
const swagger_1 = __importDefault(require("./utils/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
app.use(body_parser_1.default.json());
app.use(main_1.default);
app.use("*", errorHandler_1.errorMiddleware);
const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`
  |=============================================|
    🖇️App listening at http://localhost:${port} 🖇️
  |=============================================|
  `);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});
app.set("io", io);
(0, socket_1.createSocketConnection)(io);
(0, swagger_1.default)(app, 5000);
