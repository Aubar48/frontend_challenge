import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../../models/menu-item.model';

@Component({
  selector: 'app-menu-elemento',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './menu-elemento.component.html',
  styleUrl: './menu-elemento.component.scss'
})
export class MenuElementoComponent {
  @Input() menuItems?:MenuItem[];

}
