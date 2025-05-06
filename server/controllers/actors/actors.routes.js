import express from "express";
import { actorController } from "./actors.controller.js";
import { actorAndProducerValidation } from "../../middlewares/actorAndProducerValidation.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const actorRouter = express.Router();

actorRouter.post('/',authMiddleware,actorAndProducerValidation,actorController.createActor);
actorRouter.get('/',actorController.getActors);
actorRouter.get('/:id',actorController.getActorById);
actorRouter.put('/:id',authMiddleware,actorAndProducerValidation,actorController.editActor);
actorRouter.delete('/:id',authMiddleware,actorController.deleteActor);

export default actorRouter;