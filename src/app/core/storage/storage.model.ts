import { environment } from 'src/environments/environment';

export enum StorageType {
  Local = 'local',
  Session = 'session',
}

export enum StorageKey {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
  User = 'user',
  CachePersistence = 'httpCache',
}

export const getStorageKeyWithPrefix = (key: StorageKey) => {
  return `${environment.projectName}:${key}`;
};
