import * as yup from 'yup';
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PaymentProvider } from '../../database/providers/Payment';
import { validation } from '../../shared/middleware';

interface IQueryProps {
    start?: Date,
    end?: Date,
}

const queryValidation: yup.Schema<IQueryProps> = yup.object().shape({
    start: yup.date().required(),
    end: yup.date().required(),
});

export const getTotalByDateValidation = validation({
    query: queryValidation,
});

export const getTotalByDate: RequestHandler = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    if (!req.query.start || !req.query.end) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Invalid query.'
            }
        });
    }

    const result = await PaymentProvider.getDataByDate(req.query.start, req.query.end);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};