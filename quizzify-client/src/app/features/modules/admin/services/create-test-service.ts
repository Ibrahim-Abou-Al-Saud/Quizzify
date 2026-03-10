import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api-service';
import { environment } from '../../../../../environments/envrionment';
import { Test } from '../../../../shared/models/Test';

@Injectable({
  providedIn: 'root',
})
export class CreateTestService {
  constructor(private api: ApiService) {}

  addTest(testData: Test) {
    return this.api.add(`${environment.ServerandPort}/test`, testData);
  }

  addQuestion(questionData: any) {
    return this.api.add(`${environment.ServerandPort}/test/question`, questionData);
  }

  getAllTests() {
    return this.api.get(`${environment.ServerandPort}/test`);
  }

  getTestQuestions(id: number) {
    return this.api.get(`${environment.ServerandPort}/test/${id}`);
  }

  getAllResults() {
    return this.api.get(`${environment.ServerandPort}/test/results`);
  }

  deleteTest(id: number) {
    return this.api.delete(`${environment.ServerandPort}/test/${id}`);
  }
}
