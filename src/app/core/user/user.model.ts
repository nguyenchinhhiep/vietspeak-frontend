import { Role } from './role.model';

export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatarUrl?: string;
  role?: Role;
  claims: any[];
}

export const AccountTypeList = [
  {
    label: 'Student',
    translateKey: 'SelectAccountType.Student',
    value: Role.Student,
    icon: 'custom:student',
  },
  {
    label: 'Tutor',
    translateKey: 'SelectAccountType.Tutor',
    value: Role.Tutor,
    icon: 'custom:tutor',
  },
];
