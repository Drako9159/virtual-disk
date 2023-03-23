import app from "./src/app.js";

async function main() {
  await app.listen(app.get("port"));
  console.log("server is running on port ", app.get("port"));
}

main();