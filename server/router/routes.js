import express from "express";
import actorRouter from "../controllers/actors/actors.routes.js";
import producerRouter from "../controllers/producers/producers.routes.js";
import movieRouter from "../controllers/movies/movies.routes.js";
import userRouter from "../controllers/users/users.routes.js";

const router = express.Router();

router.use('/actors',actorRouter);
router.use('/producers',producerRouter);
router.use('/movies',movieRouter);
router.use('/users',userRouter);

export default router;