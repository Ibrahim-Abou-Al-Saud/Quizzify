import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserStorage } from '../../../core/services/user-storage';
import { CreateTestService } from '../../../features/modules/admin/services/create-test-service';
import { SpinnerService } from '../../../core/services/spinner-service';
import { ToastrService } from 'ngx-toastr';
import { Test } from '../../models/Test';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Deletion</h2>
    <mat-dialog-content style="font-size: 1rem; line-height: 1.5;"
      > Test can have multiple questions and deleting it <br>will remove all the questions and results
      associated with it.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close>Cancel</button>
      <button mat-flat-button [mat-dialog-close]="true" class="bg-danger">Delete</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  isAdminLoggedIn: boolean = UserStorage.isAdminLoggedIn();
  constructor(
    private route: Router,
    private createTestService: CreateTestService,
    private spinner: SpinnerService,
    private toast: ToastrService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}
  tests: Test[] = [];
  isLoading: boolean = true;
  buttonText: string = this.isAdminLoggedIn ? 'View Test' : 'Take Test';
  buttonIcon: string = this.isAdminLoggedIn ? 'bi bi-eye' : 'bi bi-play';
  buttonLink: string = this.isAdminLoggedIn ? '/layout/admin/view-test' : '/layout/user/take-test';

  ngOnInit(): void {
    this.getAllTests();
    this.route.events.subscribe(() => {
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
    });
  }

  getAllTests() {
    this.spinner.show();
    this.isLoading = true;
    this.createTestService.getAllTests().subscribe({
      next: (res: Test[]) => {
        this.isLoading = false;
        this.tests = res;
        this.spinner.hide();
        this.cdr.detectChanges();
        this.toast.success('Tests fetched successfully!');
      },
      error: (err: any) => {
        console.error('Error fetching tests:', err);
        this.spinner.hide();
        this.isLoading = false;
        this.toast.error('Error fetching tests.');
      },
    });
  }

  deleteTest(id: number | undefined) {
    if (!id) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.createTestService.deleteTest(id).subscribe({
          next: () => {
            this.spinner.hide();
            this.toast.success('Test deleted successfully!');
            this.getAllTests();
          },
          error: (err: any) => {
            console.error('Error deleting test:', err);
            this.spinner.hide();
            this.toast.error('Error deleting test.');
          },
        });
      }
    });
  }
}
