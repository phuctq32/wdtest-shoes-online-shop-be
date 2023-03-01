import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const init = () => {
    app.use(express.json());

    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization']
    }));
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