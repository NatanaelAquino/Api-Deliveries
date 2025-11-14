import { Request, Response } from 'express';

class DeliveriesController {

    createDelivery(request: Request, response: Response) {
        return response.status(201).json({ message: "Delivery created" });
    }
}


export { DeliveriesController };