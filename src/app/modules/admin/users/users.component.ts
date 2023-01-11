import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
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
    userStatus: '',
    userType: '',
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

  dataSource = new MatTableDataSource([]);

  ngOnInit(): void {
    // Subscribe to search input change
    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), startWith(''))
      .subscribe((input: string) => {
        if (input == null) {
          return;
        }
        this.params.filter = input;
        this.params.pageNumber = 1;
        this.getList();
      });

    //  Subscribe to type input change
    this.userTypeControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((type: any) => {
        if (type == null) {
          return;
        }
        this.params.userType = type?.value;
        this.params.pageNumber = 1;
        this.getList();
      });

    //  Subscribe to status input change
    this.userStatusControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((status: any) => {
        if (status == null) {
          return;
        }
        this.params.userStatus = status?.value;
        this.params.pageNumber = 1;
        this.getList();
      });
  }

  getList() {
    this._httpService
      .request({
        apiUrl: ApiEndpoint.Users,
        method: ApiMethod.Get,
        params: this.params,
      })
      .subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          const users = res.data.users || [];
          this.dataSource.data = users;
          const { currentPage, totalItems } = res.data;

          this.paginationConfig.currentPage = currentPage;
          this.paginationConfig.totalItems = totalItems;
        }
      });
  }

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

  approve(id: string) {
    this._usersService.approve(id);
  }

  reject(id: string) {
    this._usersService.reject(id);
  }

  block(id: string) {
    this._usersService.block(id);
  }

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
    // this.params.pageSize = pageSize;
    this.getList();
  }

  // On page number change
  onPageChanged(pageNumber: number) {
    this.params.pageNumber = pageNumber;
    this.getList();
  }

  // Reset filter
  resetFilter() {
    // Reset filter controls
    this.searchInput.setValue(null);
    this.userTypeControl.setValue(null);
    this.userStatusControl.setValue(null);

    // Reset params
    this.params = {
      pageNumber: 1,
      userStatus: '',
      userType: '',
      filter: '',
    };

    // Get list
    this.getList();
  }
}
