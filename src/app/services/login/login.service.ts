import { Injectable } from '@angular/core';
import { Auth } from '../../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/auth/login'; 

  constructor(private http: HttpClient) {}

  loginUser(userData: Auth): Observable<any> {
    return this.http.post<{ token: string }>(this.apiUrl, userData).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response); // Verifica la respuesta
        if (response && response.token) {
          // Guarda el token en localStorage
          localStorage.setItem('authToken', response.token);
          console.log('Token guardado en localStorage:', response.token);
        } else {
          console.log('No se recibió un token en la respuesta.');
        }
      })
    );
  }

  // Método para cerrar sesión y eliminar el token
  logout(): void {
    localStorage.removeItem('authToken');
    console.log('Token eliminado de localStorage');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
