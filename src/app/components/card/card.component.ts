import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ModalComponent, NgClass],
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
  @Input() detailedInfo: string = '';
  @Input() isDisponible: boolean = true;


  @Output() showModal = new EventEmitter<{ image: string, detailedInformation: string }>();

  public onButtonClick() {
    this.showModal.emit({ image: this.cardImage, detailedInformation: this.detailedInfo });
  }
}
