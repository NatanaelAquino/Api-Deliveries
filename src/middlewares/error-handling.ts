import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/AppError';
import { ZodError } from "zod"
export function errorHandlingMiddleware(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    if (error instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            issues: error.format()
        });
    }

    return res.status(500).json({
        status: 'error',
        message: error.message || 'Internal Server Error'
    });

}