import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const init = () => {
    app.use(express.json());
    app.use(express.urlencoded({ limit: '10mb', extended: false }));

    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization']
    }));

    app.use("/api", routes);

    app.use((req, res) => {
        res.status(404).json({ message: "NOT FOUND" });
    })

    app.use(errorHandler)
}

const run = () => {
    const port = process.env.PORT || 3001;

    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        }
    
        console.log("Server is running on port: " + port);
    });
}



export { init, run };