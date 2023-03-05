import * as app from "./app.js";
import db from "./configs/database.js";

app.init();

db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", () => {
  console.log("DB connected");
  app.run();
});
