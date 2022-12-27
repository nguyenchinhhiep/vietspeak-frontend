export enum Role {
  Admin = 'Admin',
  Tutor = 'Tutor',
  Student = 'Student',
}

export const RoleOptions = [
  {
    label: 'Admin',
    class: 'bg-purple-500',
    value: Role.Admin,
  },
  {
    label: 'Tutor',
    class: 'bg-accent-500',
    value: Role.Tutor,
  },
  {
    label: 'Student',
    class: 'bg-primary-500',
    value: Role.Student,
  },
];
