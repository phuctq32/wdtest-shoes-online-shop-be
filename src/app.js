import express from "express";

const app = express();

const port = 8080;

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }

    console.log("Server is running on port: " + port);
});