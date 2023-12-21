import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';
import { EUserRole } from '../Auth/EUserRole';


export const ensureAdmin: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }

    const jwtData = JWTService.verify(token);

    if (jwtData === 'JWT_KEY_NOT_FOUND') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: 'Erro ao verificar o token' }
        });
    } else if (jwtData === 'INVALID_TOKEN') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }

    req.headers.idUser = jwtData.uid.toString();
    req.headers.userRole = jwtData.role.toString();

    const userRole: EUserRole = jwtData.role;
    console.log('UID: ' + jwtData.uid);
    console.log('ROLE: ' + userRole);
    if (userRole !== EUserRole.Admin) {
        return res.status(StatusCodes.FORBIDDEN).json({
            errors: { default: 'Acesso não permitido' }
        });
    }

    return next();
};