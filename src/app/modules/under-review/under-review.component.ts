import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-under-review',
  templateUrl: './under-review.component.html',
  styleUrls: ['./under-review.component.scss'],
})
export class UnderReviewComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  onEditProfile() {
    this._router.navigate(['/onboarding/tutor']);
  }

  logout() {
    this._authService.logout().subscribe((res: boolean) => {
      this._router.navigate(['/login']);
    });
  }
}
