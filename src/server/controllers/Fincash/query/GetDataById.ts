import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../../shared/middleware';
import { FincashProvider } from '../../../database/providers/Fincash';
import { EColumnsOrderBy, OrderByObj } from '../../../database/providers/Fincash/querry/GetDataById';

interface IParamProps {
    id?: number,
}

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

const bodyValidation: yup.Schema<OrderByObj> = yup.object().shape({
    column: yup.string().oneOf(Object.values(EColumnsOrderBy)).required(),
    order: yup.string().oneOf(['asc', 'desc']).required(),
});

export const getDataByIdValidation = validation({
    params: paramsValidation,
    body: bodyValidation,
});

export const getDataById = async (req: Request<IParamProps, {}, OrderByObj>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: '"id" not found'
            }
        });
    }


    const result = await FincashProvider.getDataById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};