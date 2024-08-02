import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ProductProvider } from '../../../database/providers/Product';

export const getSectorValue = async (req: Request, res: Response) => {

    const result = await ProductProvider.getSectorValue();

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};