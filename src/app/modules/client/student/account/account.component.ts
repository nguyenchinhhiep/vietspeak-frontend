import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor() {}

  navigation: any = [];

  ngOnInit(): void {
    this.navigation = [
      {
        icon: 'mat_outline:person_outline',
        label: 'Profile',
        translateKey: 'Account.Profile',
        routerLink: `profile`,
        children: [
          {
            label: 'Profile',
            translateKey: 'Account.Profile',
            routerLink: `profile`,
          },
        ],
      },
      {
        icon: 'mat_outline:lock',
        label: 'Password',
        translateKey: 'Account.Password',
        routerLink: `password`,
      },
    ];
  }
}
