import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveriesLogsRoutes } from "./deliveries-logs-routes";
const router = Router();

router.use("/users",usersRoutes);
router.use("/sessions",sessionsRoutes);
router.use("/deliveries",deliveriesRoutes);
router.use("/deliveries-logs", deliveriesLogsRoutes);
export { router };