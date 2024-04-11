import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DecimalPipe, NgStyle],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() image: string = '';
  @Input() detailedInformation: string = '';
  @Input() propertyTitle: string = '';
  @Input() direccion: string = '';
  @Input() precio: number = 0;
  @Input() zona: string = '';
  @Input() descripcion: string = '';
  @Input() capitalAportado: number = 0;
  @Input() porcentajeInvertido: number = 0;

  public precioObjetivo: number = this.capitalAportado * 1.15;
}
