import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { environment } from '../../../environments/envrionment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  register(data:any) : Observable<any> {
    return this.apiService.add(`${environment.ServerandPort}/auth/signup`, data);
  }

  login(data:any) : Observable<any> {
    return this.apiService.add(`${environment.ServerandPort}/auth/login`, data);
  }
}
