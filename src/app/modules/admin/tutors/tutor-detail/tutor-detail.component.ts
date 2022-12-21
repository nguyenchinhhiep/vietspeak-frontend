import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-detail',
  templateUrl: './tutor-detail.component.html',
  styleUrls: ['./tutor-detail.component.scss'],
})
export class TutorDetailComponent implements OnInit {
  constructor() {}

  navigation = [
    {
      icon: 'mat_outline:person_outline',
      label: 'Profile',
      translateKey: 'Settings.Profile',
      routerLink: `profile`,
    },
  ];

  ngOnInit(): void {}
}
