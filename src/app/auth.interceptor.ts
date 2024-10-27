import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    // Clona la solicitud y añade los encabezados de autorización y content-type
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json' // Asegúrate de que el tipo de contenido sea correcto
      }
    });

    // Manejo de errores
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Redirige a la página de inicio de sesión si no está autorizado
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}
