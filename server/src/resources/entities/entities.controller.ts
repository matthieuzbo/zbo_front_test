import { Router } from "express";
import { registerController as registerUserController } from "~/resources/entities/users.controller";
import { registerController as registerBriefController } from "~/resources/entities/briefs.controller";

const EntitiesController = Router();
registerUserController(EntitiesController);
registerBriefController(EntitiesController);

// const userService = new UserService();

export { EntitiesController };
