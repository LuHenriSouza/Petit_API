import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IProduct {
    code: string,
    name: string,
    setor: number,
    price: number
}

const bodyValidation: yup.Schema<IProduct> = yup.object().shape({
    code: yup.string().required().min(1).max(20),
    name: yup.string().required().min(3).max(50),
    setor: yup.number().required().min(1).max(4),
    price: yup.number().required().min(0),
});

export const create = async (req: Request<{}, {}, IProduct>, res: Response) => {
    let validatedData: IProduct | undefined = undefined;

    try {
        validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
    } catch (e) {
        const ye = e as yup.ValidationError;
        const validationErrors: Record<string, string> = {};
        ye.inner.forEach(e => {

            if (!e.path) return;

            validationErrors[e.path] = e.message;
        });
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: validationErrors
        });
    }

    res.json(validatedData);
};