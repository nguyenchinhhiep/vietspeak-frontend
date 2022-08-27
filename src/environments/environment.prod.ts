import { LanguageCode } from "src/app/core/translation/language.model";

export const environment = {
  production: true,
  projectName: 'vietspeak',
  serverUrl: "localhost:1995",
  supportedLanguages: [LanguageCode.English, LanguageCode.Vietnamese],
  defaultLanguage: LanguageCode.Vietnamese
};
