// import { Injectable } from '@angular/core';
// import { Observable, ReplaySubject } from 'rxjs';
// import { NavigationItem } from 'src/app/components/navigation/navigation.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class NavigationService {
//   private _navigation: ReplaySubject<NavigationItem[]> = new ReplaySubject<
//     NavigationItem[]
//   >(1);

//   /**
//    * Constructor
//    */
//   constructor() {}

//   // -----------------------------------------------------------------------------------------------------
//   // @ Accessors
//   // -----------------------------------------------------------------------------------------------------

//   /**
//    * Getter and Setter for navigation
//    */
//   get navigation$(): Observable<NavigationItem[]> {
//     return this._navigation.asObservable();
//   }

//   set navigation(value: NavigationItem[]) {
//     this._navigation.next(value);
//   }
// }
