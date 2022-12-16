import { Role } from './role.model';

export interface IUser {
  id: string;
  email: string;
  role: Role;
  isPending: boolean;
  claims?: any[];
}
