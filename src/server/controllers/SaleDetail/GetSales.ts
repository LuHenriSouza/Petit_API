import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { SaleDetailProvider } from '../../database/providers/SaleDetail';
import { StatusCodes } from 'http-status-codes';

// ENV
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 7;

interface IQueryProps {
    id?: number;
    page?: number,
    limit?: number,
    filter?: string,
}

const queryValidation: yup.Schema<IQueryProps> = yup.object().shape({
    id: yup.number().moreThan(0),
    page: yup.number().moreThan(0),
    limit: yup.number().moreThan(0),
    filter: yup.string(),
});

export const getSalesValidation = validation({
    query: queryValidation,
});

export const getSales: RequestHandler = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await SaleDetailProvider.getSales(req.query.page || DEFAULT_PAGE, req.query.limit || DEFAULT_LIMIT);
    const count = await SaleDetailProvider.countSales();

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message
            }
        });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};