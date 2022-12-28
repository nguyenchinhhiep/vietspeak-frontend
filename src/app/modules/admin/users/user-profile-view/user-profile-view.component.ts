import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    public matDialogRef: MatDialogRef<UserProfileViewComponent>
  ) {}

  userType = UserType;
  userDetail: any = {};

  ngOnInit(): void {}
}
