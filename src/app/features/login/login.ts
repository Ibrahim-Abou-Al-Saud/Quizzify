import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Grid } from '../../shared/components/grid/grid';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UserStorage } from '../../core/services/user-storage';
import { SpinnerService } from '../../core/services/spinner-service';

@Component({
  selector: 'app-login',
  imports: [
    Grid,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  hide = true;
  year = new Date().getFullYear();
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private route: Router,
    private auth: AuthService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.spinner.show();
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toast.success('Login successful!', 'Success', {
          timeOut: 5000,
          positionClass: 'toast-top-center',
        });
        const user = {
          id: res.id,
          role: res.role,
        };
        UserStorage.saveUser(user);
        this.route.navigate(['/layout/home']);
      },
      error: (err) => {
        this.toast.error(err.error.message || 'Login failed. Please try again.', 'Error', {
          timeOut: 5000,
          positionClass: 'toast-top-center',
        });
        this.spinner.hide();
      },
    });
  }
}
