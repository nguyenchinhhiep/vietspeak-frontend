import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss'],
})
export class TutorProfileComponent implements OnInit {
  constructor() {}

  navigation: any = [];

  selectedItem: any = null;

  ngOnInit(): void {
    this.navigation = [
      {
        label: 'Basic info',
        translateKey: 'TutorInfo.BasicInfo',
        value: 'basic',
      },
      {
        label: 'Teaching',
        translateKey: 'TutorInfo.Teaching',
        value: 'teaching',
      },
      {
        label: 'Experience',
        translateKey: 'TutorInfo.Experience',
        value: 'experience',
      },
      {
        label: 'Additional',
        translateKey: 'TutorInfo.AdditionalInfo',
        value: 'additional',
      },
    ];

    this.selectedItem = this.navigation[0];
  }
}
