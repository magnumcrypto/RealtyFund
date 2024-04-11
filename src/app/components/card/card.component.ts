import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule, DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ModalComponent, NgClass, DecimalPipe, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() cardImage: string = '';
  @Input() tipoInmueble: string = '';
  @Input() descripcion: string = '';
  @Input() precio: number = 0;
  @Input() direccion: string = '';
  @Input() disponibilidad: string = '';
  @Input() detailedInfo: string = '';
  @Input() isDisponible: boolean = true;
  @Input() zona: string = '';
  @Input() capitalAportado: number = 0;
  @Input() porcentajeInvertido: number = 0;


  @Output() showModal = new EventEmitter<{
    image: string,
    detailedInformation: string,
    title: string,
    descripcion: string,
    precio: number,
    direccion: string,
    zona: string,
    capitalAportado: number,
    porcentajeInvertido: number
  }>();

  public onButtonClick() {
    this.showModal.emit({
      image: this.cardImage,
      detailedInformation: this.detailedInfo,
      title: this.tipoInmueble,
      descripcion: this.descripcion,
      precio: this.precio,
      direccion: this.direccion,
      zona: this.zona,
      capitalAportado: this.capitalAportado,
      porcentajeInvertido: this.porcentajeInvertido
    });
  }
}
