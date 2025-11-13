import { Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '@/utils/AppError';
import { z } from "zod"
import { hash } from 'bcrypt';

class UserController {
    async createUser(req: Request, res: Response) {

        const createUserBody = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { name, email, password } = createUserBody.parse(req.body)

        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

        if (userWithSameEmail) {
            throw new AppError('Email already in use', 409);
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const {password: _, ...userWhithoutPassord} = user;
        return res.status(201).json({ message: 'User created successfully', userWhithoutPassord });

    }
}

export { UserController };