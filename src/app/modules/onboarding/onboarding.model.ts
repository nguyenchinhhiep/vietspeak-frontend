export enum HeardFrom {
  WebSearch = 'WebSearch',
  SocialMedia = 'SocialMedia',
  FriendFamily = 'FriendFamily',
  Other = 'Other',
}

export const HeardFromOptions = [
  {
    label: 'Web search',
    translateKey: 'OnBoarding.WebSearch',
    value: HeardFrom.WebSearch,
  },
  {
    label: 'Social media',
    translateKey: 'OnBoarding.SocialMedia',
    value: HeardFrom.SocialMedia,
  },
  {
    label: 'Friend/Family',
    translateKey: 'OnBoarding.FriendFamily',
    value: HeardFrom.FriendFamily,
  },
  {
    label: 'Other',
    translateKey: 'OnBoarding.Other',
    value: HeardFrom.Other,
  },
];

export enum Language {
  English = 'English',
}

export const TeachingLanguageOptions = [
  {
    label: 'English',
    value: Language.English,
  },
];

