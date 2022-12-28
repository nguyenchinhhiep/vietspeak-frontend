export enum UserType {
  Admin = 'Admin',
  Tutor = 'Tutor',
  Student = 'Student',
}

export const UserTypeOptions = [
  {
    label: 'Admin',
    class: 'bg-purple-500',
    value: UserType.Admin,
  },
  {
    label: 'Tutor',
    class: 'bg-accent-500',
    value: UserType.Tutor,
  },
  {
    label: 'Student',
    class: 'bg-primary-500',
    value: UserType.Student,
  },
];
