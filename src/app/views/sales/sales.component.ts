import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  public cardImage1: string = '../../../assets/house_img/gallery-2681238_1280.jpg';
  public cardImage2: string = '../../../assets/house_img/house-1477041_1280.jpg';
  public cardImage3: string = '../../../assets/house_img/house-1836070_1280.jpg';
}
