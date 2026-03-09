import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../../../core/services/spinner-service';
import { CreateTestService } from '../../services/create-test-service';
import { noWhitespaceValidator } from '../../../../../shared/validators/custom-validators';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-question',
  imports: [ReactiveFormsModule, CommonModule, MatIcon],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css',
})
export class AddQuestion implements OnInit {
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private createTestService: CreateTestService,
    private toast: ToastrService,
    private spinner: SpinnerService,
    private route: Router,
  ) {}
  id!: number | null;
  questionForm!: FormGroup;

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: [null, [Validators.required, noWhitespaceValidator()]],
      optionA: [null, [Validators.required, noWhitespaceValidator()]],
      optionB: [null, [Validators.required, noWhitespaceValidator()]],
      optionC: [null, [Validators.required, noWhitespaceValidator()]],
      optionD: [null, [Validators.required, noWhitespaceValidator()]],
      answer: [null, [Validators.required, noWhitespaceValidator()]],
    });
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  onSubmit() {
    if (this.questionForm.valid) {
      console.log('Form Submitted', this.questionForm.value);
      const questionData = this.questionForm.value;
      questionData.id = this.id;
      this.spinner.show();
      this.createTestService.addQuestion(questionData).subscribe({
        next: (res) => {
          this.spinner.hide();
          this.toast.success('Question added successfully!');
          this.questionForm.reset();
        },
        error: (err) => {
          this.spinner.hide();
          this.toast.error('Failed to add question. Please try again.');
        },
      });
    }
  }
}
