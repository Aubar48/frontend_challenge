import { Component, EventEmitter, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CardMaleService } from '../../services/card-male/card-male.service';
import { CommonModule, Location } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit, AfterViewInit {
  @Input() playerCard?: PlayerCardModel;
  @Output() deletePlayer = new EventEmitter<number>();
  @Output() editPlayer = new EventEmitter<PlayerCardModel>();
  radarChart?: Chart;
  barChart?: Chart;

  constructor(
    private route: ActivatedRoute,
    private cardFemaleService: CardFemaleService,
    private cardMaleService: CardMaleService,
    private location: Location
  ) {}

  ngOnInit() {
    this.onLoadId();
  }

  ngAfterViewInit() {
    if (this.playerCard) {
      this.createRadarChart();
      this.createBarChart(); // Llama a la función del gráfico de barras
    }
  }

  private onLoadId() {
    const id = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.url[0]?.path;

    if (id) {
      const idNumber = Number(id);
      if (path === 'female') {
        this.cardFemaleService.getCardFemaleById(idNumber).subscribe({
          next: (female) => {
            this.playerCard = female;
            this.createRadarChart();
            this.createBarChart();
          },
          error: (err) => console.error('Error al cargar tarjeta femenina:', err)
        });
      } else if (path === 'players') {
        this.cardMaleService.getCardMaleById(idNumber).subscribe({
          next: (player) => {
            this.playerCard = player;
            this.createRadarChart();
            this.createBarChart();
          },
          error: (err) => console.error('Error al cargar tarjeta masculina:', err)
        });
      }
    } else {
      console.warn('ID de jugador no encontrado');
    }
  }

  private createRadarChart() {
    const data = {
      labels: ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physic'],
      datasets: [{
        label: this.playerCard?.long_name || 'Estadísticas del jugador',
        data: [
          this.playerCard?.pace || 0,
          this.playerCard?.shooting || 0,
          this.playerCard?.passing || 0,
          this.playerCard?.dribbling || 0,
          this.playerCard?.defending || 0,
          this.playerCard?.physic || 0
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data,
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    };

    const ctx = document.getElementById('radarChart') as HTMLCanvasElement;
    if (ctx) {
      this.radarChart = new Chart(ctx, config);
    }
  }

  private createBarChart() {
    const data = {
      labels: ['Aggression', 'Interceptions', 'Positioning', 'Vision', 'Penalties', 'Composure'],
      datasets: [{
        label: this.playerCard?.long_name || 'Atributos adicionales',
        data: [
          this.playerCard?.mentality_aggression || 0,
          this.playerCard?.mentality_interceptions || 0,
          this.playerCard?.mentality_positioning || 0,
          this.playerCard?.mentality_vision || 0,
          this.playerCard?.mentality_penalties || 0,
          this.playerCard?.mentality_composure || 0
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    };

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (ctx) {
      this.barChart = new Chart(ctx, config);
    }
  }

  onDelete() {
    if (this.playerCard) {
      const path = this.route.snapshot.url[0]?.path;
      if (path === 'female') {
        this.deleteFemaleCard(this.playerCard.id);
      } else if (path === 'players') {
        this.deleteMaleCard(this.playerCard.id);
      }
      this.goBack();
    } else {
      console.warn('playerCard está indefinido durante el intento de eliminación');
    }
  }

  private deleteFemaleCard(id: number) {
    this.cardFemaleService.deleteCardFemale(id).subscribe({
      next: () => console.log('Tarjeta femenina eliminada con éxito'),
      error: (err) => console.error('Error eliminando tarjeta femenina:', err)
    });
  }

  private deleteMaleCard(id: number) {
    this.cardMaleService.deleteCardMale(id).subscribe({
      next: () => console.log('Tarjeta masculina eliminada con éxito'),
      error: (err) => console.error('Error eliminando tarjeta masculina:', err)
    });
  }

  onEdit() {
    if (this.playerCard) {
      this.editPlayer.emit(this.playerCard);
    } else {
      console.warn('playerCard está indefinido durante el intento de edición');
    }
  }

  goBack() {
    this.location.back();
  }
}
