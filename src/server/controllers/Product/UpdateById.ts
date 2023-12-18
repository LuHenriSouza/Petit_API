import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IProduct } from '../../database/models';

interface IParamProps {
    id?: number,
}

interface IBodyProps extends Omit<IProduct, 'id' | 'created_at' | 'updated_at' | 'code'> {}

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
}); 

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    sector: yup.number().required().min(1).max(4),
    price: yup.number().required().min(0),
}); 

export const updateByIdValidation = validation({
    params: paramsValidation,
    body: bodyValidation,
});

export const updateById = async (req: Request<IParamProps>, res: Response) => {
    
    res.json(req.params);
};