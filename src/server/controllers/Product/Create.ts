import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IBodyProps {
    code: string,
    name: string,
    sector: number,
    price: number
}

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    code: yup.string().required().min(1).max(20),
    name: yup.string().required().min(3).max(50),
    sector: yup.number().required().min(1).max(4),
    price: yup.number().required().min(0),
}); 

export const createValidation = validation({
    body: bodyValidation,
});

export const create: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    res.json(req.body);
};