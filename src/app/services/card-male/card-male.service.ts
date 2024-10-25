import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardMale } from '../../models/card-male.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador `map`

@Injectable({
  providedIn: 'root'
})
export class CardMaleService {
  private apiUrl = 'http://localhost:3000/players';

  constructor(private httpClient: HttpClient) {}

  // Obtener todos los jugadores, ahora con soporte para paginación
  getCardMale(page: number = 1, limit: number = 10): Observable<CardMale[]> {
    // Ajusta la URL para incluir parámetros de paginación
    const params = `?page=${page}&limit=${limit}`;
    return this.httpClient.get<{ players: any }>(`${this.apiUrl}${params}`).pipe(
      map(response => {
        // Devuelve solo los valores de los jugadores
        return Object.values(response.players);
      })
    );
  }

  // Agregar un nuevo jugador
  postCardMale(newCardMale: CardMale): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(this.apiUrl, newCardMale);
  }

  // Actualizar un jugador existente
  putCardMale(updatedCardMale: CardMale): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(`${this.apiUrl}/${updatedCardMale.id}`, updatedCardMale);
  }

  // Eliminar un jugador por ID
  deleteCardMale(cardMaleId: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(`${this.apiUrl}/${cardMaleId}`);
  }
}
