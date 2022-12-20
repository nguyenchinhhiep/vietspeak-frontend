import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { HttpService } from 'src/app/core/http/services/http.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
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

  displayedColumns: string[] = ['photo', 'name', 'email', 'status', 'action'];

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
