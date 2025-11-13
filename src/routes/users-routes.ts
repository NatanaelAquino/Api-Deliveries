import { Router } from "express";

import { UserController } from "../controllers/users-controller";

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post("/users", userController.createUser);

export { usersRoutes }; 