"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yaml_1 = __importDefault(require("yaml"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function swaggerDocs(app, port) {
    const filePath = path_1.default.join(__dirname, "./docs.yaml");
    try {
        const swaggerDefinition = yaml_1.default.parse(fs_1.default.readFileSync(filePath, "utf8"));
        // Swagger page
        app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDefinition, {
            customSiteTitle: "BetterBikesAPI docs",
        }));
    }
    catch (error) {
        console.error("Error parsing the YAML file:", error);
    }
}
exports.default = swaggerDocs;
