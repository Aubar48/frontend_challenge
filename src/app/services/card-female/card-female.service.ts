import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerCardModel } from '../../models/player-card.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador `map`

@Injectable({
  providedIn: 'root'
})
export class CardFemaleService {
  private apiUrl = 'http://localhost:3000/female';

  constructor(private httpClient: HttpClient) {}

  // Obtener todos los jugadores, transformando la respuesta para mayor flexibilidad
  getCardFemale(page: number = 1, limit: number = 10): Observable<PlayerCardModel[]> {
    const params = `?page=${page}&limit=${limit}`;

    return this.httpClient.get<{ players: any }>(`${this.apiUrl}${params}`).pipe(
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

  // Obtener una jugadora por ID
  getCardFemaleById(id: number): Observable<PlayerCardModel> {
    return this.httpClient.get<PlayerCardModel>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo jugador
  postCardFemale(newPlayerCardModel: PlayerCardModel): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(this.apiUrl, newPlayerCardModel);
  }

  // Actualizar un jugador existente
  putCardFemale(updatedPlayerCardModel: PlayerCardModel): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(`${this.apiUrl}/${updatedPlayerCardModel.id}`, updatedPlayerCardModel);
  }

  // Eliminar un jugador por ID
  deleteCardFemale(playerCardModelId: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(`${this.apiUrl}/${playerCardModelId}`);
  }
}
