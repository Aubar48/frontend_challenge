import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/auth/register'; 

  constructor(private http: HttpClient) {}

  registerUser(userData: Auth): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
