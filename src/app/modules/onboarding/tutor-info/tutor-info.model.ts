export enum TeachingExperience {
  No = 'No',
  ZeroToSixMonths = '0 - 6 months',
  SevenToTwelveMonths = '7 - 12 months',
  OneToTwoYears = '1 - 2 years',
  MoreThanTwoYears = 'More than 2 years',
}

export const TeachingExperienceOptions = [
  {
    label: 'No',
    translateKey: 'TutorInfo.No',
    value: TeachingExperience.No,
  },
  {
    label: '0 - 6 months',
    translateKey: 'TutorInfo.ZeroToSixMonths',
    value: TeachingExperience.ZeroToSixMonths,
  },
  {
    label: '7 - 12 months',
    translateKey: 'TutorInfo.SevenToTwelveMonths',
    value: TeachingExperience.SevenToTwelveMonths,
  },
  {
    label: '1 - 2 years',
    translateKey: 'TutorInfo.OneToTwoYears',
    value: TeachingExperience.OneToTwoYears,
  },
  {
    label: 'More than 2 years',
    translateKey: 'TutorInfo.MoreThanTwoYears',
    value: TeachingExperience.MoreThanTwoYears,
  },
];
