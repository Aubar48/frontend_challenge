import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BurgerItem } from '../../../models/burger-item.model';

@Component({
  selector: 'app-burger-menu-elemento',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './burger-menu-elemento.component.html',
  styleUrl: './burger-menu-elemento.component.scss'
})
export class BurgerMenuElementoComponent {
  @Input() burgerMenuItems?:BurgerItem[];
}
