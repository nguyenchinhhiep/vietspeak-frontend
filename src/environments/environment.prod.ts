import { LanguageCode } from 'src/app/core/translation/language.model';

export const environment = {
  production: true,
  projectName: 'vietspeak',
  serverUrl: 'http://localhost:1996/api/',
  supportedLanguages: [LanguageCode.English, LanguageCode.Vietnamese],
  defaultLanguage: LanguageCode.Vietnamese,
};
