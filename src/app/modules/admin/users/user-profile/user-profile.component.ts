import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/core/user/user-type.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor() {}

  userType = UserType;
  userProfile = {
    userType: UserType.Student,
  };

  ngOnInit(): void {}
}
