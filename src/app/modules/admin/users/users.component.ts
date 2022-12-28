import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserType, UserTypeOptions } from 'src/app/core/user/user-type.model';
import { UserStatus, UserStatusOptions } from 'src/app/core/user/user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private _confirmationDialogService: ConfirmationDialogService,
    private _translateService: TranslateService,
    private _httpService: HttpService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService
  ) {}

  paginationConfig = {
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 1,
  };

  params = {
    pageNumber: 1,
    pageSize: 10,
    isActive: '',
    filter: '',
  };

  userStatuses = UserStatusOptions;
  userTypes = UserTypeOptions.filter((item) => item.value !== UserType.Admin);

  userStatus = UserStatus;
  userType = UserType;

  searchInput: FormControl = new FormControl();
  userTypeControl: FormControl = new FormControl();
  userStatusControl: FormControl = new FormControl();

  displayedColumns: string[] = [
    'no',
    'photo',
    'name',
    'email',
    'type',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ]);

  ngOnInit(): void {
    // Subscribe to search input change
    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((input: string) => {
        this.params.filter = input;
        this.params.pageNumber = 1;
        this.getList();
      });
  }

  getList() {}

  onDetail() {
    this._router.navigate(['1'], {
      relativeTo: this._activatedRoute,
    });
  }

  // Delete
  delete(id: string) {
    this._usersService.delete(id);
  }

  viewProfile(id: string) {
    this._usersService.viewProfile(id);
  }

  approve(id: string) {}

  reject(id: string) {}

  block(id: string) {}

  // Get status
  getStatus(status: UserStatus) {
    return (
      UserStatusOptions.find((item) => item.value === status) || {
        label: '',
        translateKey: '',
        class: '',
      }
    );
  }

  // Get user type
  getUserType(type: UserType) {
    return (
      UserTypeOptions.find((item) => item.value === type) || {
        label: '',
        translateKey: '',
        class: '',
      }
    );
  }

  // On page size change
  onPageSizeChanged(pageSize: number) {
    // Reset page number
    this.params.pageNumber = 1;

    this.params.pageSize = pageSize;
    this.getList();
  }

  // On page number change
  onPageChanged(pageNumber: number) {
    this.params.pageNumber = pageNumber;
    this.getList();
  }
}
