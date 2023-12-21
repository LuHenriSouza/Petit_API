import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ProdGroupProvider } from '../../database/providers/ProductGroup';
import { StatusCodes } from 'http-status-codes';

// ENV
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 7;

interface IQueryProps {
    page?: number,
    limit?: number,
}

interface IParamProps {
    id?: number,
}

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

const queryValidation: yup.Schema<IQueryProps> = yup.object().shape({
    page: yup.number().moreThan(0),
    limit: yup.number().moreThan(0),

});

export const getProductsByIdValidation = validation({
    query: queryValidation,
    params: paramsValidation,

});

export const getProductsById: RequestHandler = async (req: Request<IParamProps, {}, {}, IQueryProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: '"id" not found'
            }
        });
    }

    const result = await ProdGroupProvider.getProductsById(req.query.page || DEFAULT_PAGE, req.query.limit || DEFAULT_LIMIT, req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};