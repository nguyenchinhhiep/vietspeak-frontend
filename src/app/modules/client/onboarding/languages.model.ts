export enum Language {
  English = 'English',
  Chinese = 'Chinese',
  Thai = 'Thai',
  Japanese = 'Japanese',
  Korean = 'Korean',
  Vietnamese = 'Vietnamese',
}

export const LanguageOptions = [
  {
    label: 'English',
    translateKey: 'Languages.English',
    value: Language.English,
  },
  {
    label: 'Vietnamese',
    translateKey: 'Languages.Vietnamese',
    value: Language.Vietnamese,
  },
  {
    label: 'Chinese',
    translateKey: 'Languages.Chinese',
    value: Language.Chinese,
  },
  {
    label: 'Thai',
    translateKey: 'Languages.Thai',
    value: Language.English,
  },
  {
    label: 'Japanese',
    translateKey: 'Languages.Japanese',
    value: Language.Japanese,
  },
  {
    label: 'Korean',
    translateKey: 'Languages.Korean',
    value: Language.Korean,
  },
];

export enum Fluency {
  Native = 'Native',
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export const FluencyOptions = [
  { value: Fluency.A1, label: 'A1', translateKey: 'A1' },
  { value: Fluency.A2, label: 'A2', translateKey: 'A2' },
  { value: Fluency.B1, label: 'B1', translateKey: 'B1' },
  { value: Fluency.B2, label: 'B2', translateKey: 'B2' },
  { value: Fluency.C1, label: 'C1', translateKey: 'C1' },
  { value: Fluency.C2, label: 'C2', translateKey: 'C2' },
  { value: Fluency.Native, label: 'Native', translateKey: 'Languages.Native' },
];

export const TeachingLanguageOptions = [
  {
    label: 'English',
    value: Language.English,
    imgUrl: 'assets/images/flags/US.svg',
  },
];

export enum TeachingExperience {
  No = 'No',
  OneToSixMonths = '1 - 6 months',
  SevenToTwelveMonths = '7 - 12 months',
  OneToTwoYears = '1 - 2 years',
  MoreThanTwoYears = 'More than 2 years',
}

export const TeachingExperienceOptions = [
  {
    label: 'No',
    translateKey: 'Languages.No',
    value: TeachingExperience.No,
  },
  {
    label: '1 - 6 months',
    translateKey: 'TutorProfile.OneToSixMonths',
    value: TeachingExperience.OneToSixMonths,
  },
  {
    label: '7 - 12 months',
    translateKey: 'TutorProfile.SevenToTwelveMonths',
    value: TeachingExperience.SevenToTwelveMonths,
  },
  {
    label: '1 - 2 years',
    translateKey: 'TutorProfile.OneToTwoYears',
    value: TeachingExperience.OneToTwoYears,
  },
  {
    label: 'More than 2 years',
    translateKey: 'TutorProfile.MoreThanTwoYears',
    value: TeachingExperience.MoreThanTwoYears,
  },
];

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
    translateKey: 'StudentProfile.Beginner',
    value: LanguageLevel.Beginner,
  },
  {
    label: 'Intermediate',
    translateKey: 'StudentProfile.Intermediate',
    value: LanguageLevel.Intermediate,
  },
  {
    label: 'Advanced',
    translateKey: 'StudentProfile.Advanced',
    value: LanguageLevel.Advanced,
  },
];
