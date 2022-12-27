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
    class: 'bg-success-500',
    value: UserStatus.Active,
  },
  {
    label: 'Inactive',
    translateKey: 'Status.Inactive',
    class: 'bg-danger-500',
    value: UserStatus.Active,
  },
  {
    label: 'Pending',
    translateKey: 'Status.Pending',
    class: 'bg-warn-400',
    value: UserStatus.Active,
  },
  {
    label: 'Reviewing',
    translateKey: 'Status.UnderReview',
    class: 'bg-info-500',
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
