import { Role } from './role.model';

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Reviewing = 'Reviewing',
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
  {
    label: 'Under review',
    translateKey: 'Status.UnderReview',
    class: 'tag--info',
    value: UserStatus.Reviewing,
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
