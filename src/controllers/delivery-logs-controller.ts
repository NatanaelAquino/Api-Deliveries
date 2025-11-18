import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "@/utils/AppError";


class DeliveryLogsController {
    async getDeliveryLogs(req: Request, res: Response) {
        console.log(req.params);
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string(),
        });

        const { delivery_id, description } = bodySchema.parse(req.body);

        console.log(delivery_id, description);

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
        });

        if (!delivery) {
            throw new AppError("Entrega não encontrada.", 404);
        }
        if(delivery.status === "delivered") {
            throw new AppError("Entregas finalizadas não podem receber novos logs.");
        }
        if (delivery.status === "processing") {
            throw new AppError("change status to shipped");
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description,
            },
        });

        return res.status(201).send();

    }
    async showDeliveryLogs(req: Request, res: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),
        });
        const { delivery_id } = paramsSchema.parse(req.params);

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
            include: {
                user: true,
                logs: true,
            },
        });

        console.log(req.user?.role === "customer" );
        console.log( req.user?.id !== delivery?.userId);

        if (req.user?.role === "customer" && req.user?.id === delivery?.userId) {
            throw new AppError("Unauthorized", 403);
        }
        return res.json(delivery);
    }
}


export { DeliveryLogsController };