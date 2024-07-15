import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ISaleDetails } from '../../database/models';
import { SaleDetailProvider } from '../../database/providers/SaleDetail';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps {
    data: Omit<ISaleDetails, 'id' | 'created_at' | 'updated_at' | 'pricetotal' | 'sale_id'>[];
    obs?: string | null; // Usando union type para representar que pode ser string ou null
}
const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    data: yup.array().of(
        yup.object().shape({
            prod_id: yup.number().positive().required().integer(),
            quantity: yup.number().positive().required().integer(),
            price: yup.number().required().positive(),
        })
    ).required(),
    obs: yup.string().nullable()
});

export const createValidation = validation({
    body: bodyValidation,
});

export const create: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await SaleDetailProvider.create(req.body.data, req.body.obs);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};