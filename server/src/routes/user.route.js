import express from 'express';
import { getAllUser, createUser, updateUser, getUserById, deleteUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id",deleteUser);

export default userRouter;