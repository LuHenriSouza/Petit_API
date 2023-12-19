// import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import * as yup from 'yup';

// import { FincashProvider } from '../../database/providers/Fincash';
// import { validation } from '../../shared/middleware';
// import { IFincash } from '../../database/models';

// interface IParamProps {
//     id?: number,
// }

// interface IBodyProps extends Omit<IFincash, 'id' | 'created_at' | 'updated_at'> { }

// const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
//     id: yup.number().integer().required().moreThan(0),
// });

// const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
//     opener: yup.string().required().min(3).max(30),
//     value: yup.number().required().min(0),

//     finalValue: yup.number().default(null),
//     finalDate: yup.date().default(null),
//     isFinished: yup.boolean().default(false),
// });

// export const updateByIdValidation = validation({
//     params: paramsValidation,
//     body: bodyValidation,
// });

// export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
//     if (!req.params.id) {
//         return res.status(StatusCodes.BAD_REQUEST).json({
//             errors: {
//                 default: '"id" not found'
//             }
//         });
//     }
//     const result = await FincashProvider.updateById(req.params.id, req.body);
//     if (result instanceof Error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             errors: {
//                 default: result.message
//             }
//         });
//     }

//     return res.status(StatusCodes.NO_CONTENT).json(result);
// };