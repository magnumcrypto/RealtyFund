import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() cardImage: string = '';
  @Input() tipoInmueble: string = '';
  @Input() descripcion: string = '';
  @Input() precio: string = '';
  @Input() direccion: string = '';
  @Input() disponibilidad: string = '';
}
