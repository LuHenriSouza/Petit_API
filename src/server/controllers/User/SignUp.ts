import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IUser } from '../../database/models';
import { UserProvider } from '../../database/providers/Users';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<IUser, 'id'> { }

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    email: yup.string().required().email().min(5).max(50),
    password: yup.string().required().min(6),

});

export const createValidation = validation({
    body: bodyValidation,
});

export const signUp: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await UserProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};