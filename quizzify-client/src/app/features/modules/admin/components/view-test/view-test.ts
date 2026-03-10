import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../../../core/services/spinner-service';
import { ToastrService } from 'ngx-toastr';
import { CreateTestService } from '../../services/create-test-service';
import { Question } from '../../../../../shared/models/Question';

@Component({
  selector: 'app-view-test',
  imports: [],
  templateUrl: './view-test.html',
  styleUrl: './view-test.css',
})
export class ViewTest implements OnInit {
  questions: Question[] = [];
  testId!: number;

  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private toast: ToastrService,
    private testService: CreateTestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.testId = +params['id'];
      this.loadQuestions();
    });

  }

  loadQuestions() {
    this.spinner.show();
    this.testService.getTestQuestions(this.testId).subscribe(
      (response: any) => {
        console.log('Questions loaded:', response.questions);
        this.questions = response.questions;
        this.spinner.hide();
        this.toast.success('Questions loaded successfully');
        this.cdr.detectChanges();
      },
      (error) => {
        this.spinner.hide();
        this.toast.error('Failed to load questions');
      },
    );
  }
}
