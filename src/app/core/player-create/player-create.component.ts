import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardMaleService } from '../../services/card-male/card-male.service';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.scss']
})
export class PlayerCreateComponent {
  playerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cardMaleService: CardMaleService,
    private cardFemaleService: CardFemaleService
  ) {
    this.playerForm = this.fb.group({
      id: [null, Validators.required],
      fifa_version: ['', Validators.required],
      fifa_update: ['', Validators.required],
      player_face_url: ['', Validators.required],
      long_name: ['', Validators.required],
      player_positions: ['', Validators.required],
      club_name: [''],
      nationality_name: [''],
      overall: [0, Validators.required],
      potential: [0, Validators.required],
      value_eur: [null],
      wage_eur: [null],
      age: [null, Validators.required],
      height_cm: [null],
      weight_kg: [null],
      preferred_foot: [''],
      weak_foot: [0],
      skill_moves: [0],
      international_reputation: [0],
      work_rate: [''],
      body_type: [''],
      pace: [0],
      shooting: [0],
      passing: [0],
      dribbling: [0],
      defending: [0],
      physic: [0],
      attacking_crossing: [0],
      attacking_finishing: [0],
      attacking_heading_accuracy: [0],
      attacking_short_passing: [0],
      attacking_volleys: [0],
      skill_dribbling: [0],
      skill_curve: [0],
      skill_fk_accuracy: [0],
      skill_long_passing: [0],
      skill_ball_control: [0],
      movement_acceleration: [0],
      movement_sprint_speed: [0],
      movement_agility: [0],
      movement_reactions: [0],
      movement_balance: [0],
      power_shot_power: [0],
      power_jumping: [0],
      power_stamina: [0],
      power_strength: [0],
      power_long_shots: [0],
      mentality_aggression: [0],
      mentality_interceptions: [0],
      mentality_positioning: [0],
      mentality_vision: [0],
      mentality_penalties: [0],
      mentality_composure: [0],
      defending_marking: [0],
      defending_standing_tackle: [0],
      defending_sliding_tackle: [0],
      goalkeeping_diving: [0],
      goalkeeping_handling: [0],
      goalkeeping_kicking: [0],
      goalkeeping_positioning: [0],
      goalkeeping_reflexes: [0],
      goalkeeping_speed: [0],
      player_traits: [[]] // Array vacío para inicializar traits como lista
    });
  }


  onSubmit() {
    if (this.playerForm.valid) {
      const newPlayer: PlayerCardModel = this.playerForm.value;

      // Aquí eliges el servicio adecuado
      this.cardMaleService.postCardMale(newPlayer).subscribe(response => {
        console.log('Player creado:', response);
      });

      // O usa el servicio para jugadoras
      this.cardFemaleService.postCardFemale(newPlayer).subscribe(response => {
        console.log('Jugadora creada:', response);
      });
    }
  }
}
