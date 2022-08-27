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
    label: 'Giáo viên',
    value: Role.Teacher,
    icon: 'custom:teacher'
  },
  {
    label: 'Học viên',
    value: Role.Student,
    icon: 'custom:student'
  },
];
