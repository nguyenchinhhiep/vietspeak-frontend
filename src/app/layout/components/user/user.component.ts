import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {}

  logout() {
    this._authService.logout().subscribe();
  }

  onSettings() {
    const currentUser = this._userService.currentUserValue;
    const role = currentUser?.role;
    if (role === 'Admin') {
      this._router.navigate(['/admin/settings']);
    }
    if (role === 'Tutor') {
      this._router.navigate(['/tutor/settings']);
    }

    if (role === 'Student') {
      this._router.navigate(['/student/settings']);
    }
  }
}
