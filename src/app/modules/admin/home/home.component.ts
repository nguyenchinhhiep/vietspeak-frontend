import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/core/user/role.model';
import { UserStatus } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
