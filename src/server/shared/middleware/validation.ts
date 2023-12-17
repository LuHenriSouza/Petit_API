import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'query' | 'params';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAllSchemas = Record<TProperty, Schema<any>>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler

export const validation: TValidation = (schemas) => async (req, res, next) => {

    const errorResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });
        } catch (e) {
            const ye = e as ValidationError;
            const errors: Record<string, string> = {};
            ye.inner.forEach(e => {

                if (!e.path) return;

                errors[e.path] = e.message;
            });
            errorResult[key] = errors;
        }
    });

    if (Object.entries(errorResult).length == 0) {
        return next();
    }
    else {
        return res.status(StatusCodes.BAD_REQUEST).json({errors: errorResult});
    }
};