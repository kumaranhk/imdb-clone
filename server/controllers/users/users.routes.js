import express from "express";
import { userController } from "./users.controller.js";

const userRouter = express.Router();

userRouter.post('/',userController.createUser);
userRouter.post('/validate-user',userController.validateUser);
userRouter.delete('/:id',userController.deleteUser);
userRouter.get('/',userController.getUsers);
userRouter.get('/:id',userController.getUser);

export default userRouter;