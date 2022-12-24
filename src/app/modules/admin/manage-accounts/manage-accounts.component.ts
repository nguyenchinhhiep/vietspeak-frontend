import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserStatus, UserStatusOptions } from 'src/app/core/user/user.model';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit {

  constructor(
    private _confirmationDialogService: ConfirmationDialogService,
    private _translateService: TranslateService,
    private _httpService: HttpService
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

  searchInput: FormControl = new FormControl();

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

  // Delete
  delete(id: string) {
    const dialogRef = this._confirmationDialogService.open();

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
      }
    });
  }

  // Get status
  getStatus(status: UserStatus) {
    return (
      UserStatusOptions.find((item) => item.value === status) || {
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
