import express from 'express';
import 'express-async-errors';
import { errorHandlingMiddleware } from '@/middlewares/error-handling';


const app = express();

app.use(express.json());

app.use(errorHandlingMiddleware);


export { app };