import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardMale } from '../../models/card-male.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardMaleService {
  private apiUrl = 'http://localhost:3000/players';

  constructor(private httpClient: HttpClient) {}

  // Obtener todos los jugadores
  getCardMale(): Observable<CardMale[]> {
    return this.httpClient.get<CardMale[]>(this.apiUrl);
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
