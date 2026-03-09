import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CreateTestService } from '../../services/create-test-service';
import { SpinnerService } from '../../../../../core/services/spinner-service';
import { ToastrService } from 'ngx-toastr';
import { TestResult } from '../../../../../shared/models/Test';

@Component({
  selector: 'app-view-results',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './view-results.html',
  styleUrl: './view-results.css',
})
export class ViewResults implements OnInit, AfterViewInit {
  results: TestResult[] = [];
  dataSource = new MatTableDataSource<TestResult>();
  displayedColumns: string[] = ['userName', 'testName', 'totalQuestions', 'correctAnswers', 'percentage', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private testService: CreateTestService,
    private spinner: SpinnerService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadResults();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadResults() {
    this.spinner.show();
    this.testService.getAllResults().subscribe({
      next: (res) => {
        this.results = res;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.results);
        this.toast.success('Results loaded successfully', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.spinner.hide();
      },
      error: (err) => {
        this.toast.error('Failed to load results', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.spinner.hide();
      },
    });
  }
}
