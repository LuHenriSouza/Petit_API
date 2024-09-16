import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { addDays } from 'date-fns';
import { IPayment } from '../../database/models';
import { StatusCodes } from 'http-status-codes';
import { PaymentProvider } from '../../database/providers/Payment';

interface IBodyProps extends Omit<IPayment, 'id' | 'created_at' | 'updated_at' | 'value' | 'expiration'> { }

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    code: yup.string().required().min(47).max(47),
    supplier_id: yup.number().required().min(0),
    desc: yup.string(),
});

export const createValidation = validation({
    body: bodyValidation,
});

export const create: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const code = req.body.code;
    const baseDate = '1997-10-07';
    const days = Number(code.substring(33, 37));

    const expiration = addDays(baseDate, days);
    const value = Number(code.substring(37)) / 100;
    const obj = {
        ...req.body,
        value,
        expiration
    };
    console.log(obj);
    const result = await PaymentProvider.create(obj);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};