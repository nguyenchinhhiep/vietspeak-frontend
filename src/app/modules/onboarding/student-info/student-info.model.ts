export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export const Genders: {
  label: string;
  translateKey: string;
  value: Gender;
}[] = [
  {
    label: 'Male',
    translateKey: 'OnBoarding.Male',
    value: Gender.Male,
  },
  {
    label: 'Female',
    translateKey: 'OnBoarding.Female',
    value: Gender.Female,
  },
  {
    label: 'Other',
    translateKey: 'OnBoarding.Other',
    value: Gender.Other,
  },
];

export enum Occupation {
  Student = 'student',
  Employee = 'employee',
  Other = 'other',
}

export const Occupations: {
  label: string;
  translateKey: string;
  value: Occupation;
}[] = [
  {
    label: 'Student',
    translateKey: 'OnBoarding.Student',
    value: Occupation.Student,
  },
  {
    label: 'Employee',
    translateKey: 'OnBoarding.Employee',
    value: Occupation.Employee,
  },
  {
    label: 'Other',
    translateKey: 'OnBoarding.Other',
    value: Occupation.Other,
  },
];
