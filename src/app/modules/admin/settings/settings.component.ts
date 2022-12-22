import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  navigation: any = [];

  ngOnInit(): void {
    this.navigation = [
      {
        icon: 'mat_outline:person_outline',
        label: 'Profile',
        translateKey: 'Settings.Profile',
        routerLink: `/admin/settings/profile`,
      },
      {
        icon: 'mat_outline:lock',
        label: 'Password',
        translateKey: 'Settings.Password',
        routerLink: `/admin/settings/password`,
      },
    ];
  }
}
