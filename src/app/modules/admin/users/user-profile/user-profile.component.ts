import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserType } from 'src/app/core/user/user-type.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(private _usersService: UsersService) {}
  userType = UserType;
  userProfile: any = null;

  ngOnInit(): void {
    this._usersService.userProfile$.subscribe((val: any) => {
      this.userProfile = val;
    });
  }
}
