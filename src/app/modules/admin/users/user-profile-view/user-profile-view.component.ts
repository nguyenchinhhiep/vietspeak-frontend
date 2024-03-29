import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserType } from 'src/app/core/user/user-type.model';
import { UserStatus, UserStatusOptions } from 'src/app/core/user/user.model';
import { TeachingExperienceOptions } from 'src/app/modules/client/onboarding/languages.model';
import { HeardFromOptions } from 'src/app/modules/client/onboarding/onboarding.model';

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

  // Get status
  getStatus(status: UserStatus) {
    return (
      UserStatusOptions.find((item) => item.value === status) || {
        label: '',
        translateKey: '',
        class: '',
      }
    );
  }

  // Get teaching experience label
  getTeachingExperienceLabel(val: string) {
    return TeachingExperienceOptions.find((item) => item.value == val)
      ?.translateKey;
  }

  // Get teaching experience label
  getHeardFromLabel(val: string) {
    return HeardFromOptions.find((item) => item.value == val)?.translateKey;
  }
}
