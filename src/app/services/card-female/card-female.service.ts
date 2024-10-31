import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerCardModel } from '../../models/player-card.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CardFemaleService {
  private apiUrl = 'http://localhost:3000/female';

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

  // Obtener todas las jugadoras, transformando la respuesta para mayor flexibilidad
  getCardFemale(page: number = 1, limit: number = 100): Observable<PlayerCardModel[]> {
    const params = `?page=${page}&limit=${limit}`;
    return this.httpClient.get<{ players: any }>(`${this.apiUrl}${params}`, this.getHttpOptions()).pipe(
      map(response => Object.values(response.players))
    );
  }

  // Obtener una jugadora por ID
  getCardFemaleById(id: number): Observable<PlayerCardModel> {
    return this.httpClient.get<PlayerCardModel>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  // Agregar una nueva jugadora
  postCardFemale(newPlayerCardModel: PlayerCardModel): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`${this.apiUrl}/create`, newPlayerCardModel, this.getHttpOptions());
  }

  // Actualizar una jugadora existente
  putCardFemale(updatedPlayerCardModel: PlayerCardModel): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(`${this.apiUrl}/edit/${updatedPlayerCardModel.id}`, updatedPlayerCardModel, this.getHttpOptions());
  }

  // Eliminar una jugadora por ID
  deleteCardFemale(playerCardModelId: number): Observable<{ message: string }> {
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
}
