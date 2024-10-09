import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { FincashProvider } from '../../database/providers/Fincash';
import { validation } from '../../shared/middleware';
import { IFincash } from '../../database/models';

interface IParamProps {
    id?: number,
}

interface IBodyProps extends Omit<IFincash, 'id' | 'created_at' | 'updated_at' | 'opener' | 'value' | 'finalDate' | 'isFinished'> { }

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    finalValue: yup.number().required()
});

export const finishValidation = validation({
    params: paramsValidation,
    body: bodyValidation,
});

export const finish = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: '"id" not found'
            }
        });
    }
    const result = await FincashProvider.finish(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};