import { UserType } from './user-type.model';

export enum UserStatus {
  Active = 'Active',
  Pending = 'Pending',
  Reviewing = 'Reviewing',
  Blocked = 'Blocked',
}

export const UserStatusOptions = [
  {
    label: 'Active',
    translateKey: 'Status.Active',
    class: 'bg-success-500',
    value: UserStatus.Active,
  },
  {
    label: 'Pending',
    translateKey: 'Status.Pending',
    class: 'bg-warn-400',
    value: UserStatus.Pending,
  },
  {
    label: 'Reviewing',
    translateKey: 'Status.Reviewing',
    class: 'bg-info-500',
    value: UserStatus.Reviewing,
  },
  {
    label: 'Blocked',
    translateKey: 'Status.Blocked',
    class: 'bg-gray-400',
    value: UserStatus.Blocked,
  },
];

export interface IUser {
  email?: string;
  userType?: UserType;
  status?: UserStatus;
  name?: string;
  avatar?: string;
  claims?: any[];
}
