import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/envrionment';
import { ApiService } from '../../../../core/services/api-service';
import { UserStorage } from '../../../../core/services/user-storage';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private api: ApiService) {}

  getTestQuestions(id: number) {
    return this.api.get(`${environment.ServerandPort}/test/${id}`);
  }

  submitTest(data: any) {
    return this.api.add(`${environment.ServerandPort}/test/submit`, data);
  }

  getUserResults() {
    const userId = UserStorage.getUserId();
    return this.api.get(`${environment.ServerandPort}/test/results/${userId}`);
  }

}
