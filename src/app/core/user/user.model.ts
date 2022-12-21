import { Role } from './role.model';

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
}

export const UserStatusOptions = [
  {
    label: 'Active',
    translateKey: 'Status.Active',
    class: 'tag--success',
    value: UserStatus.Active,
  },
  {
    label: 'Inactive',
    translateKey: 'Status.Inactive',
    class: 'tag--danger',
    value: UserStatus.Active,
  },
  {
    label: 'Pending',
    translateKey: 'Status.Pending',
    class: 'tag--warning',
    value: UserStatus.Active,
  },
];

export interface IUser {
  id: string;
  email: string;
  role?: Role;
  status: UserStatus;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
  claims?: any[];
}
