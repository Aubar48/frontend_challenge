import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardFemale } from '../../models/card-female.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador `map`

@Injectable({
  providedIn: 'root'
})
export class CardFemaleService {
  private apiUrl = 'http://localhost:3000/female';

  constructor(private httpClient: HttpClient) {}

  // Obtener todos los jugadores, transformando la respuesta para mayor flexibilidad
  getCardFemale(): Observable<CardFemale[]> {
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
  postCardFemale(newCardFemale: CardFemale): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(this.apiUrl, newCardFemale);
  }

  // Actualizar un jugador existente
  putCardFemale(updatedCardFemale: CardFemale): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(`${this.apiUrl}/${updatedCardFemale.id}`, updatedCardFemale);
  }

  // Eliminar un jugador por ID
  deleteCardFemale(cardFemaleId: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(`${this.apiUrl}/${cardFemaleId}`);
  }
}
