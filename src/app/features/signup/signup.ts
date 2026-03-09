import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Grid } from '../../shared/components/grid/grid';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { SpinnerService } from '../../core/services/spinner-service';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  hide = true;
  year = new Date().getFullYear();
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private route: Router,
    private auth: AuthService,
    private spinner: SpinnerService,
  ) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.spinner.show();
    this.auth.register(this.signupForm.value).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toast.success('Registration successful! Please login to continue.');
        this.route.navigate(['/login']);
      },
      error: (err) => {
        console.log('Registration error:', err.error);
        this.toast.error(err.error || 'Registration failed. Please try again.');
        this.spinner.hide();
      },
    });
  }
}
