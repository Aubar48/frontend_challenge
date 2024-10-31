import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Auth } from '../../models/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/auth/login'; 
  private authenticatedSource = new BehaviorSubject<boolean>(this.isAuthenticated());
  authenticated$ = this.authenticatedSource.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inyecta PLATFORM_ID
  ) {}

  private getHttpOptions() {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    // Verifica que 'window' esté definido (solo en el navegador)
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('authToken') || '';
      httpHeaders = httpHeaders.set('Authorization', `Bearer ${authToken}`);
    }

    return { headers: httpHeaders };
  }

  loginUser(userData: Auth): Observable<any> {
    return this.http.post<{ token: string }>(this.apiUrl, userData).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.authenticatedSource.next(true); // Emitir nuevo estado de autenticación
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authenticatedSource.next(false); // Emitir nuevo estado de autenticación
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      return !!token; // Devuelve true si hay un token
    }
    return false; // No estamos en el navegador
  }
  
}
