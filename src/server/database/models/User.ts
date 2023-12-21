import { EUserRole } from '../../shared/Auth/EUserRole';

export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    role: EUserRole,
    
}