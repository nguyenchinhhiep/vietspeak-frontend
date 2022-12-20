import { Role } from './role.model';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}

export const UserStatusOptions = [
  {
    label: 'Active',
    translateKey: 'UserStatus.Active',
    class: 'tag--success',
    value: UserStatus.Active,
  },
  {
    label: 'Inactive',
    translateKey: 'UserStatus.Inactive',
    class: 'tag--danger',
    value: UserStatus.Active,
  },
  {
    label: 'Pending',
    translateKey: 'UserStatus.Pending',
    class: 'tag--warning',
    value: UserStatus.Active,
  },
];

export interface IUser {
  id: string;
  email: string;
  role: Role;
  status: UserStatus;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
  claims?: any[];
}
