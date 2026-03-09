import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/envrionment';
import { ApiService } from '../../../../core/services/api-service';

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
}
