import { ChangeDetectorRef, Component } from '@angular/core';
import { Question } from '../../../../../shared/models/Question';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../../../../core/services/spinner-service';
import { ToastrService } from 'ngx-toastr';
import { CreateTestService } from '../../../admin/services/create-test-service';
import { TestService } from '../../services/test-service';
import { UserStorage } from '../../../../../core/services/user-storage';

@Component({
  selector: 'app-take-test',
  imports: [],
  templateUrl: './take-test.html',
  styleUrl: './take-test.css',
})
export class TakeTest {
  questions: Question[] = [];
  testId!: number;
  selectedAnswers: {[key: number]: string} = {};
  timeRemaining: number = 0;
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: SpinnerService,
    private toast: ToastrService,
    private testService: CreateTestService,
    private cdr: ChangeDetectorRef,
    private test: TestService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.testId = +params['id'];
      this.loadQuestions();
    });

  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.cdr.detectChanges();
      } else {
        clearInterval(this.timerInterval);
        this.toast.warning('Time is up! Submitting your test automatically.');
        this.submitAnswers();
      }
    }, 1000);
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  loadQuestions() {
    this.spinner.show();
    this.testService.getTestQuestions(this.testId).subscribe(
      (response: any) => {
        console.log('Questions loaded:', response.questions);
        this.questions = response.questions;
        const durationInMinutes = response.testDTO.duration || 30; // Default to 30 minutes if not provided
        this.timeRemaining = durationInMinutes * 60;
        this.startTimer();

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

  onAnswerChange(questionId: number, selectedOption: string) {
    this.selectedAnswers[questionId] = selectedOption;
    console.log('Selected answers:', this.selectedAnswers);
  }

  submitAnswers() {
    const answersArray = Object.keys(this.selectedAnswers).map((questionId) => ({
      questionId: +questionId,
      selectedOption: this.selectedAnswers[+questionId],
    }));

    const submissionData = {
      testId: this.testId,
      userId: UserStorage.getUserId(),
      responses: answersArray,
    };

    console.log('Submitting answers:', submissionData);

    this.spinner.show();
    this.test.submitTest(submissionData).subscribe(
      (response) => {
        this.spinner.hide();
        this.toast.success('Test submitted successfully');
        this.router.navigateByUrl('layout/user/view-results');
      },
      (error) => {
        this.spinner.hide();
        this.toast.error('Failed to submit test');
      },
    );
  }
}
