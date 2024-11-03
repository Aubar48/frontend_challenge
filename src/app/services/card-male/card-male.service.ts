import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerCardModel } from '../../models/player-card.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CardMaleService {
  private apiUrl = 'http://localhost:3000/players';

  constructor(private httpClient: HttpClient) {}

  // Función privada para configurar los encabezados
  private getHttpOptions() {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    // Verifica que 'window' esté definido (solo en el navegador)
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken') || '';
      httpHeaders = httpHeaders.set('Authorization', `Bearer ${authToken}`);
    }

    return { headers: httpHeaders };
  }

  // Obtener todos los jugadores, ahora con soporte para paginación
  getCardMale(page: number, limit: number): Observable<PlayerCardModel[]> {
    const params = `?page=${page}&limit=${limit}`;
    return this.httpClient.get<{ players: any }>(`${this.apiUrl}${params}`, this.getHttpOptions()).pipe(
      map(response => Object.values(response.players))
    );
  }

  // Obtener un jugador por ID
  getCardMaleById(id: number): Observable<PlayerCardModel> {
    return this.httpClient.get<PlayerCardModel>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  // Agregar un nuevo jugador
  postCardMale(newPlayerCardModel: PlayerCardModel): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`${this.apiUrl}/create`, newPlayerCardModel, this.getHttpOptions());
  }

  // Actualizar un jugador existente
  putCardMale(updatedPlayerCardModel: PlayerCardModel): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(`${this.apiUrl}/edit/${updatedPlayerCardModel.id}`, updatedPlayerCardModel, this.getHttpOptions());
  }

  // Eliminar un jugador por ID
  deleteCardMale(playerCardModelId: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(`${this.apiUrl}/${playerCardModelId}`, this.getHttpOptions());
  }

  // Función para buscar jugadores por término
  searchPlayers(searchTerm: string): Observable<PlayerCardModel[]> {
    const params = `?search=${encodeURIComponent(searchTerm)}`; // Codifica el término de búsqueda
    return this.httpClient.get<{ players: PlayerCardModel[] }>(`${this.apiUrl}${params}`, this.getHttpOptions()).pipe(
      map(response => response.players)
    );
  }

  // Función para descargar los datos de jugadores como CSV
  downloadCSV(): void {
    this.httpClient.get(`${this.apiUrl}/download/csv`, {
      ...this.getHttpOptions(),
      responseType: 'blob'  // Esto asegura que recibimos el archivo como un blob
    }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'players.csv';
      a.click();
      window.URL.revokeObjectURL(url);  // Liberar el objeto URL
    }, error => {
      console.error('Error al descargar el archivo CSV', error);
    });
}

 // Convertir CSV a Excel y descargar el archivo
 convertCsvToExcel(): void {
  this.httpClient.get(`${this.apiUrl}/convert/csv-to-excel`, { 
    ...this.getHttpOptions(),
    responseType: 'blob' 
  }).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'players.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);  // Liberar el objeto URL
  }, error => {
    console.error('Error al descargar el archivo Excel', error);
  });
}
// Método para importar datos desde un archivo CSV
importDataFromCSV(file: File): Observable<{ message: string }> {
  const formData = new FormData();
  formData.append('file', file);

  return this.httpClient.post<{ message: string }>(`${this.apiUrl}/importar`, formData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
      // No necesitas especificar 'Content-Type' o 'enctype' aquí
    }
  }).pipe(
    catchError((error) => {
      console.error('Error al importar los datos', error);
      return throwError(error);
    })
  );
}
}
