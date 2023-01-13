import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserType } from 'src/app/core/user/user-type.model';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
})
export class UserProfileViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
    },
    public matDialogRef: MatDialogRef<UserProfileViewComponent>,
    private _httpService: HttpService
  ) {}

  userType = UserType;
  userProfile: any = null;

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this._httpService
      .request({
        apiUrl: ApiEndpoint.Users + '/' + this.data.id,
        method: ApiMethod.Get,
      })
      .subscribe((res: IApiResponse) => {
        this.userProfile = res.data || {};
      });
  }
}
