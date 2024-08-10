import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IProdOutput } from '../../database/models';
import { ProductProvider } from '../../database/providers/Product';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<IProdOutput, 'id' | 'created_at' | 'updated_at'> { }

export enum EProdOutReason {
    Vencimento = 'vencimento',
    Consumo = 'consumo',
    Improprio = 'improprio'
}

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    prod_id: yup.number().required().min(0),
    quantity: yup.number().required().min(0),
    reason: yup.mixed<EProdOutReason>().required().oneOf(Object.values(EProdOutReason)),
    fincash_id: yup.number().min(0),
    desc: yup.string(),
});

export const outputValidation = validation({
    body: bodyValidation,
});

export const output: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await ProductProvider.output(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};