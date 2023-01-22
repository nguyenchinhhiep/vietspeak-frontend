import { LanguageCode } from 'src/app/core/translation/language.model';

export const environment = {
  production: true,
  projectName: 'vietspeak',
  serverUrl: 'https://vietspeak-backend.vercel.app/api/',
  supportedLanguages: [LanguageCode.English, LanguageCode.Vietnamese],
  defaultLanguage: LanguageCode.Vietnamese,
};
