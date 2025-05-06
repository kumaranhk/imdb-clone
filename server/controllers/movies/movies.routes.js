import express from "express";
import { movieController } from "./movies.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const movieRouter = express.Router();

movieRouter.get("/", movieController.getMovies);
movieRouter.get("/:id", movieController.getMovieById);
movieRouter.post("/",authMiddleware, movieController.createMovie);
movieRouter.put("/:id",authMiddleware, movieController.editMovie);
movieRouter.delete("/:id",authMiddleware, movieController.deleteMovie);

export default movieRouter;
