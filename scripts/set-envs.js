const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();
// * remember to have your .env file with key!

const targetPath = "./src/environments/environments.ts";
const envFileContent = `

export const environment = {

  mapbox_key: "${process.env["MAPBOX_KEY"]}"

};

`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envFileContent);
