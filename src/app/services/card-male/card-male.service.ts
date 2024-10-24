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

  // Obtener todos los jugadores, transformando la respuesta para mayor flexibilidad
  getCardMale(): Observable<CardMale[]> {
    return this.httpClient.get<{ players: any }>(this.apiUrl).pipe(
      // Transforma los datos antes de entregarlos al componente
      map(response => {
        // Si solo necesitas los valores de los jugadores
        return Object.values(response.players);
        
        // Si necesitas las claves junto con los valores, usa esta versión:
        /*
        return Object.entries(response.players).map(([key, player]) => ({
          key, // Mantén la clave si es importante
          ...player
        }));
        */
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
