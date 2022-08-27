export const languageKey = 'language';

export enum LanguageCode {
  English = 'en-US',
  Vietnamese = 'vi-VN',
}

export const languages = [
  {
    label: 'English',
    imgUrl: 'assets/images/languages/en.png',
    value: LanguageCode.English,
    locale: 'en-gb'
  },
  {
    label: 'Vietnamese',
    imgUrl: 'assets/images/languages/vi.png',
    value: LanguageCode.Vietnamese,
    locale: 'vi'
  }
]