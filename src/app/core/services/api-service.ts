import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor (private http: HttpClient) {}

  add(endpoint: string, data: any): Observable<any> {
    return this.http.post(endpoint, data);
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(endpoint);
  }
}
