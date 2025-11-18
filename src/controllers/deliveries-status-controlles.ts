import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveriesStatusController {
    async updade(request: Request, response: Response) {
        const parasSchema = z.object({
            id: z.string().uuid(),
        });
        const bodySchema = z.object({
            status: z.enum(["processing", "shipped", "delivered"]),
        });
        const { id } = parasSchema.parse(request.params);
        const { status } = bodySchema.parse(request.body);
        await prisma.delivery.update({
            data: {
                status,
            },
            where: {
                id,
            }
        });
        await prisma.deliveryLog.create({
            data: {
                deliveryId: id,
                description:  status,
            }
        });



        response.status(200).send();

    }
}

export { DeliveriesStatusController };