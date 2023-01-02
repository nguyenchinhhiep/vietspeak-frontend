import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './user.model';

@Injectable()
export class UserService {
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
}
