import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";

const router = Router();

router.use(usersRoutes);
router.use(sessionsRoutes);

export { router };