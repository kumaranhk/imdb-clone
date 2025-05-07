import express, { json } from "express";
import dotenv from "dotenv";
import mongooseConnect from "./config/db-config.js";
import router from "./router/routes.js";
import cors from 'cors';
import logger from "./middlewares/logger.js";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8000;
mongooseConnect();
server.use(cors());
server.use(json());
server.use(logger);
server.use('/api',router);

//server listening
server.listen(PORT,() => {
    console.log(`Server listening in the ${PORT}`)
});
