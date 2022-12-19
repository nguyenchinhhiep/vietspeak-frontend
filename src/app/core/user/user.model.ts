import { Role } from './role.model';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}

export interface IUser {
  id: string;
  email: string;
  role: Role;
  status: UserStatus;
  fullName?: string;
  avatarUrl?: string;
  claims?: any[];
}
