import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string,
}

const queryValidation: yup.Schema<IQueryProps> = yup.object().shape({
    page: yup.number().moreThan(0),
    limit: yup.number().moreThan(0),
    filter: yup.string(),
}); 

export const getAllValidation = validation({
    query: queryValidation,
});

export const getAll: RequestHandler = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    
    res.json(req.query);
};