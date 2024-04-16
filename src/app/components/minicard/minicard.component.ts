import { CommonModule, DecimalPipe, NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-minicard',
  standalone: true,
  imports: [NgStyle, DecimalPipe, CommonModule],
  templateUrl: './minicard.component.html',
  styleUrl: './minicard.component.css'
})
export class MinicardComponent {
  @Input() title: string = '';
  @Input() precioCompra: number = 0;
  @Input() precioVenta: number = 0;
  @Input() rentabilidad: number = 0;
  @Input() imagen: string = '';
  @Input() descripcion: string = '';

  public reaction: boolean = true;
  reactionPost() {
    (this.reaction) ? this.reaction = false : this.reaction = true;
  }
}
