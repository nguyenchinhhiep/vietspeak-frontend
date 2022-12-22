import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss'],
})
export class TutorProfileComponent implements OnInit {
  constructor() {}

  navigation: any = [];

  ngOnInit(): void {
    this.navigation = [
      {
        icon: 'mat_outline:person_outline',
        label: 'Basic',
        translateKey: 'TutorInfo.Basic',
        routerLink: 'basic',
      },
      {
        icon: 'mat_outline:lock',
        label: 'Experience',
        translateKey: 'TutorInfo.Experience',
        routerLink: 'experience',
      },
      {
        icon: 'mat_outline:lock',
        label: 'Additional',
        translateKey: 'TutorInfo.Additional',
        routerLink: 'additional',
      },
    ];
  }
}
