import { Request, Response } from 'express';
import { z} from "zod"
class UserController {
    createUser(req: Request, res: Response ) {
        
        const createUserBody = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { name, email, password } = createUserBody.parse(req.body)

        return res.status(201).json({ message: 'User created successfully', data: { name, email } });
        
    }   
}

export { UserController };