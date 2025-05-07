import express from "express";
import { producerController } from './producers.controller.js';
import { actorAndProducerValidation } from "../../middlewares/actorAndProducerValidation.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const producerRouter = express.Router();

producerRouter.get("/", producerController.getProducers);
producerRouter.get("/:id", producerController.getProducerById);
producerRouter.post("/",authMiddleware,actorAndProducerValidation, producerController.createProducer);
producerRouter.put("/:id",authMiddleware,actorAndProducerValidation, producerController.editProducer);
producerRouter.delete("/:id",authMiddleware, producerController.deleteProducer);

export default producerRouter;
    