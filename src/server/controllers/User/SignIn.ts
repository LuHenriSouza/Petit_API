import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IUser } from '../../database/models';
import { UserProvider } from '../../database/providers/Users';
import { StatusCodes } from 'http-status-codes';
import { JWTService, PasswordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'name' | 'role'> { }

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    email: yup.string().required().min(0).max(50),
    password: yup.string().required().min(0),

});

export const signInValidation = validation({
    body: bodyValidation,
});

export const signIn: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { email, password } = req.body;

    const result = await UserProvider.getByEmail(email);
    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos'
            }
        });
    }
    const passwordMatch = await PasswordCrypto.verifyPassword(password, result.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos'
            }
        });
    } else {
        const accessToken = JWTService.sign({ uid: result.id, role: result.role });
        if (accessToken === 'JWT_KEY_NOT_FOUND' || accessToken === 'INVALID_TOKEN') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso'
                }
            });
        }
        return res.status(StatusCodes.OK).json({ accessToken });
    }
};