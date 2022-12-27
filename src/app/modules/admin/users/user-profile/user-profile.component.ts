import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/core/user/role.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor() {}

  role = Role;
  userType: Role = Role.Tutor;

  ngOnInit(): void {}
}
