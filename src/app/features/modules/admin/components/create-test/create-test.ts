import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerService } from '../../../../../core/services/spinner-service';
import { CreateTestService } from '../../services/create-test-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-test',
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-test.html',
  styleUrl: './create-test.css',
})
export class CreateTest implements OnInit {
  testForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinner: SpinnerService,
    private test: CreateTestService,
    private toast: ToastrService,
  ) {}
  ngOnInit(): void {
    this.testForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      duration: [null, [Validators.required, Validators.min(1)]],
      description: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.spinner.show();
    this.test.addTest(this.testForm.value).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toast.success('Test created successfully!', 'Success', {
          timeOut: 5000,
          positionClass: 'toast-top-center',
        });
        this.testForm.reset();
      },
      error: (err) => {
        this.spinner.hide();
        this.toast.error('Failed to create test. Please try again.', 'Error', {
          timeOut: 5000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
