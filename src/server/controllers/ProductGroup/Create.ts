import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IGroup } from '../../database/models';
import { ProdGroupProvider } from '../../database/providers/ProductGroup';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<IGroup, 'id'> { }

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3).max(30),
});

export const createValidation = validation({
    body: bodyValidation,
});

export const create: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await ProdGroupProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};