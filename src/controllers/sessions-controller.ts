import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { z } from "zod";
import { compare } from "bcrypt";

import { AppError } from "@/utils/AppError";


class SessionsController {

    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            email: z.string().trim().email(),
            password: z.string().trim().min(6)
        });


        const { email, password } = bodySchema.parse(req.body);

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new AppError('Email or password incorrect', 401);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect', 401);
        }

        res.send('Create session');
    }

}

export { SessionsController };