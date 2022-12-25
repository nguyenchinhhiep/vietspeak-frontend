export enum Role {
  Admin = 'Admin',
  Tutor = 'Tutor',
  Student = 'Student'
}

export const RoleOptions = [
  {
    label: 'Admin',
    class: 'tag--info',
    value: Role.Admin,
  },
  {
    label: 'Tutor',
    class: 'tag--accent',
    value: Role.Tutor,
  },
  {
    label: 'Student',
    class: 'tag--primary',
    value: Role.Student,
  },
]

