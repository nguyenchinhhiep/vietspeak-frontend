import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private _userService: UserService) {}

  navigation: any = [];

  ngOnInit(): void {
    const userRole = this._userService.currentUserValue?.role;

    this.navigation = [
      {
        icon: 'mat_outline:person_outline',
        label: 'Profile',
        translateKey: 'Settings.Profile',
        routerLink: `/${userRole}/settings/profile`,
      },
      {
        icon: 'mat_outline:lock',
        label: 'Password',
        translateKey: 'Settings.Password',
        routerLink: `/${userRole}/settings/password`,
      },
    ];
  }
}
