import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ICashOutflow } from '../../database/models';
import { CashOutflowProvider } from '../../database/providers/CashOutflow';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<ICashOutflow, 'id' | 'created_at' | 'updated_at'> { }

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    type: yup.string().required().min(1).max(15),
    fincash_id: yup.number().required().moreThan(0),
    value: yup.number().required(),
    desc: yup.string().nullable().max(100),

});

export const createValidation = validation({
    body: bodyValidation,
});

export const create: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await CashOutflowProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};