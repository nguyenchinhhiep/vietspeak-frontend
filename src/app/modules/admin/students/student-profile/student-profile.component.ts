import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  constructor() {}

  navigation: any = [];

  selectedItem: any = null;

  ngOnInit(): void {
    this.navigation = [
      {
        label: 'Basic',
        translateKey: 'StudentInfo.BasicInfo',
        value: 'basic',
      },
      {
        label: 'Learning',
        translateKey: 'StudentInfo.Learning',
        value: 'learning',
      },
    ];

    this.selectedItem = this.navigation[0];
  }
}
