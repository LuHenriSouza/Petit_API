import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ISaleDetails } from '../../database/models';
import { SaleDetailProvider } from '../../database/providers/SaleDetail';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<ISaleDetails, 'id' | 'created_at' | 'updated_at' | 'pricetotal' | 'sale_id'> { }

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    prod_id: yup.number().moreThan(0).required().integer(),
    quantity: yup.number().moreThan(0).required().integer(),
    price: yup.number().required(),
});

export const createValidation = validation({
    body: yup.array().of(bodyValidation),
});

export const create: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await SaleDetailProvider.create([req.body]);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};