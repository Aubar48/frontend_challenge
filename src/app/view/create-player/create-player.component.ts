import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardMaleService } from '../../services/card-male/card-male.service';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent {
  playerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cardMaleService: CardMaleService,
    private cardFemaleService: CardFemaleService,
    private route: ActivatedRoute
  ) {
    this.playerForm = this.fb.group({
      fifa_version: ['', Validators.required],
      fifa_update: ['', Validators.required],
      player_face_url: ['', Validators.required],
      long_name: ['', Validators.required],
      player_positions: ['', Validators.required],
      overall: [0, Validators.required],
      potential: [0, Validators.required],
      age: [null, Validators.required]
    });
  }

  createPlayer() {
    const pathSegments = this.route.snapshot.url.map(segment => segment.path);
    const relevantPath = pathSegments.slice(0, 2).join('/');

    if (this.playerForm.valid) {
      const newPlayerData = this.playerForm.value as PlayerCardModel;

      if (relevantPath === 'players/create') {
        this.cardMaleService.postCardMale(newPlayerData).subscribe(response => {
          console.log('Jugador creado:', response);
        });
      } else if (relevantPath === 'female/create') {
        this.cardFemaleService.postCardFemale(newPlayerData).subscribe(response => {
          console.log('Jugadora creada:', response);
        });
      } else {
        console.warn('Path no reconocido:', relevantPath);
      }
    }
  }
}
