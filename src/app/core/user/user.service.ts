import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiEndpoint } from '../http/api.model';
import { IUser } from './user.model';

@Injectable()
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  private _currentUser: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set currentUser(value: IUser) {
    this._currentUser.next(value);
  }

  get currentUser$(): Observable<IUser | null> {
    return this._currentUser.asObservable();
  }

  /**
   * Get the current user value
   */
  get currentUserValue(): IUser | null {
    return this._currentUser.value;
  }

  /**
   * Upload user avatar
   *
   * @param avatar
   */
  uploadAvatar(avatar: any): Observable<any> {
    const formData = new FormData();

    formData.append('avatar', avatar);

    return this._httpClient.post(ApiEndpoint.Avatar, formData);
  }

  /**
   * Upload certificates
   *
   * @param certificates
   */
  uploadCertificates(certificates: any[]): Observable<any> {
    const formData = new FormData();

    for (let item of certificates) {
      formData.append('certificates', item);
    }

    return this._httpClient.post(ApiEndpoint.UploadCertificates, formData);
  }
}
