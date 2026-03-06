import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api-service';
import { environment } from '../../../../../environments/envrionment';

interface Test {
  title: string;
  duration: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreateTestService {

  constructor(private api: ApiService) {}

  addTest(testData: Test) {
    return this.api.add(`${environment.ServerandPort}/test`, testData);
  }

  getAllTests() {
    return this.api.get(`${environment.ServerandPort}/test`);
  }
}
