import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  constructor() { }

  navigation: any = [];

  ngOnInit(): void {
    this.navigation = [
      {
        label: 'Basic',
        translateKey: 'StudentInfo.Basic',
        routerLink: 'basic',
      }
    ];
  }

}
