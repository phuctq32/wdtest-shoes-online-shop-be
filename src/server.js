import * as app from "./app.js";
import db from "./configs/database.js";
import { addUser } from "./utils/addData.js";
app.init();

db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", () => {
  console.log("DB connected");
  app.run();
});

addUser("testing@gmail.com", "123213", "shoe", true);
