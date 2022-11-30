export const languageKey = 'language';

export enum LanguageCode {
  English = 'en-US',
  Vietnamese = 'vi-VN',
}

export const languages = [
  {
    label: 'English',
    imgUrl: 'assets/images/flags/US.svg',
    value: LanguageCode.English,
    locale: 'en-gb',
  },
  {
    label: 'Tiếng Việt',
    imgUrl: 'assets/images/flags/VN.svg',
    value: LanguageCode.Vietnamese,
    locale: 'vi',
  },
];
