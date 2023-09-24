import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import path from "path";
import fs from "fs";

function swaggerDocs(app: Express, port: number) {
  const filePath = path.join(__dirname, "./docs.yaml");

  try {
    const swaggerDefinition = YAML.parse(fs.readFileSync(filePath, "utf8"));

    // Swagger page
    app.use(
      "/",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDefinition, {

        customSiteTitle: "BetterBikesAPI docs",
      })
    );
  } catch (error) {
    console.error("Error parsing the YAML file:", error);
  }
}

export default swaggerDocs;
