import * as app from "./app.js";
import db from "./configs/database.js";
import Product from "./models/product.js";
app.init();

db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", () => {
  console.log("DB connected");
  app.run();
});


