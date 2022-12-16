import { Role } from "src/app/core/user/role.model";

export enum HeardFrom {
  WebSearch = 'Web Search',
  SocialMedia = 'Social Media',
  FriendFamily = 'Friend / Family',
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
    label: 'Friend / Family',
    translateKey: 'OnBoarding.FriendFamily',
    value: HeardFrom.FriendFamily,
  },
  {
    label: 'Other',
    translateKey: 'OnBoarding.Other',
    value: HeardFrom.Other,
  },
];

export const AccountTypeList = [
  {
    label: 'Student',
    translateKey: 'SelectAccountType.Student',
    value: Role.Student,
    icon: 'custom:student',
  },
  {
    label: 'Tutor',
    translateKey: 'SelectAccountType.Tutor',
    value: Role.Tutor,
    icon: 'custom:tutor',
  },
];
