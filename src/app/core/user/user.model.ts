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
    translateKey: 'OnBoarding.Student',
    value: Role.Student,
    icon: 'custom:student',
  },
  {
    label: 'Teacher',
    translateKey: 'OnBoarding.Teacher',
    value: Role.Teacher,
    icon: 'custom:teacher',
  },
];
