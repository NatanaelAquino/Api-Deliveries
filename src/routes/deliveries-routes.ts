import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();


deliveriesRoutes.post("/", ensureAuthenticated, deliveriesController.createDelivery);

export {deliveriesRoutes };
