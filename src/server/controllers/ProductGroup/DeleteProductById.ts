import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { ProdGroupProvider } from '../../database/providers/ProductGroup';
import { validation } from '../../shared/middleware';

interface IParamProps {
    id?: number,
}

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

export const deleteProductByIdValidation = validation({
    params: paramsValidation,
});

export const deleteProductById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: '"id" not found'
            }
        });
    }

    const result = await ProdGroupProvider.deleteProductById(req.params.id);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};