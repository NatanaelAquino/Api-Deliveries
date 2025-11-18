import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { DeliveryLogsController } from "../controllers/delivery-logs-controller";
import { Router } from "express";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";


const deliveriesLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();


deliveriesLogsRoutes.post("/",
    ensureAuthenticated, 
    verifyUserAuthorization(["sale"]),
     deliveryLogsController.getDeliveryLogs);

deliveriesLogsRoutes.get("/:delivery_id/show",
    ensureAuthenticated, 
    verifyUserAuthorization(["sale", "customer"]),
     deliveryLogsController.showDeliveryLogs);
    


export { deliveriesLogsRoutes };