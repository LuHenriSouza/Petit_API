import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CashOutflowProvider } from '../../database/providers/CashOutflow';
import { validation } from '../../shared/middleware';
import { TEditBodyProps } from './types';


interface IParamProps {
    id?: number,
}

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});


const bodyValidation: yup.Schema = yup.object().shape({
    type: yup.mixed().oneOf(['add', 'update', 'delete']).required(),
    content: yup.mixed().required(),
});

export const editByIdValidation = validation({
    params: paramsValidation,
    body: bodyValidation,
});

export const editById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: '"id" not found'
            }
        });
    }

    const { type, content } = req.body as TEditBodyProps;
    const contentErrors: Error = validateContent(content);
    let result;
    if (!contentErrors) {
        if (type === 'delete') {
            result = await CashOutflowProvider.EditById.hardDelete(req.params.id);
        } else if (type === 'add') {
            result = await CashOutflowProvider.EditById.add(content);
        } else if (type === 'update') {
            result = await CashOutflowProvider.EditById.update(req.params.id, content);
        }
    }
    if (!result) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Invalid content' // ESPECIFICAR O ERRO COM contentErrors.message
            }
        });
    }
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};