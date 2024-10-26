import { Injectable } from '@angular/core';
import { Login } from '../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/auth/login'; 

  constructor(private http: HttpClient) {}

  loginUser(userData: Login): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
