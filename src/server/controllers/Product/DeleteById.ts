import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IParamProps {
    id?: number,
}

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
}); 

export const deleteByIdValidation = validation({
    params: paramsValidation,
});

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    
    res.json(req.params);
};