import { Request, Response } from "express";
import { z } from "zod";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";


import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";
import { prisma } from "../database/prisma";


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

        const {jwtSecret, tokenExpiration } = authConfig.jwt;

        const token = jwt.sign({role: user.role ?? "customer"}, jwtSecret, {
            subject: user.id,
            expiresIn: tokenExpiration
        });

        const {password: hashedPassword, ...userWhithoutPassword} = user 
        return res.status(200).json({ token, user: userWhithoutPassword } );
    }

}

export { SessionsController };