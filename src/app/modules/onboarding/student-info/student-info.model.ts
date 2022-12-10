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

export enum Language {
  English = 'English',
}

export const learningLanguageOptions = [
  {
    label: 'English',
    value: Language.English,
    imgUrl: 'assets/images/flags/US.svg',
  },
];

export enum LanguageLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export const LanguageLevelOptions = [
  {
    label: 'Beginner',
    translateKey: 'StudentInfo.Beginner',
    value: LanguageLevel.Beginner,
  },
  {
    label: 'Intermediate',
    translateKey: 'StudentInfo.Intermediate',
    value: LanguageLevel.Intermediate,
  },
  {
    label: 'Advanced',
    translateKey: 'StudentInfo.Advanced',
    value: LanguageLevel.Advanced,
  },
];
