import { Request, Response } from 'express';

class UserController {
    createUser(req: Request, res: Response): Response {
        return res.status(201).send({ message: 'User created successfully' });
    }
}

export { UserController };