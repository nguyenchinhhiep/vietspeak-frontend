export type Theme = 'default' | string;

export type Scheme = 'light' | 'dark';

export interface IAppConfig {
  theme: Theme;
  scheme: Scheme;
}

export const breakpoints = {
  sm: '(min-width: 600px)',
  md: '(min-width: 960px)',
  lg: '(min-width: 1280px)',
  xl: '(min-width: 1440px)',
};

export const appConfig: IAppConfig = {
  theme: 'theme-default',
  scheme: 'light',
};
