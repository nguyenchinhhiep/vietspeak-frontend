import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  constructor() {}
  navigation: any = [];

  ngOnInit(): void {
    this.navigation = [
      {
        icon: 'mat_outline:person_outline',
        label: 'General',
        translateKey: 'General',
        routerLink: 'general',
      },
    ];
  }
}
