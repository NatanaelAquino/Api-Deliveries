import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controlles";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", ensureAuthenticated, deliveriesController.createDelivery);
deliveriesRoutes.get("/", ensureAuthenticated, deliveriesController.getDeliveries);

deliveriesRoutes.patch("/:id/status", ensureAuthenticated, deliveriesStatusController.updade);

export {deliveriesRoutes };

