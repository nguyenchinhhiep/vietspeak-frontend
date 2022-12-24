import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-under-review',
  templateUrl: './under-review.component.html',
  styleUrls: ['./under-review.component.scss']
})
export class UnderReviewComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
  }

}
