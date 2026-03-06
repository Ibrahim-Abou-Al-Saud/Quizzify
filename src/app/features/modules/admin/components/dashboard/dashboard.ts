import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserStorage } from '../../../../../core/services/user-storage';
import { CreateTestService } from '../../services/create-test-service';
import { SpinnerService } from '../../../../../core/services/spinner-service';
import { ToastrService } from 'ngx-toastr';

interface Test {
  id: number;
  title: string;
  duration: number;
  description: string;
}

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
  ) {}
  tests: Test[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.route.events.subscribe(() => {
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
    });
    this.getAllTests();
  }

  getAllTests() {
    this.spinner.show();
    this.isLoading = true;
    this.createTestService.getAllTests().subscribe({
      next: (res: Test[]) => {
        this.isLoading = false;
        this.tests = res;
        this.toast.success('Tests fetched successfully!', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('Error fetching tests:', err);
        this.spinner.hide();
        this.isLoading = false;
        this.toast.error('Error fetching tests.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
