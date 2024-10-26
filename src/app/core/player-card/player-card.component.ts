import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerCardModel } from '../../models/player-card.model';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent {
  @Input() playerCard?: PlayerCardModel; // Individual player card
}
