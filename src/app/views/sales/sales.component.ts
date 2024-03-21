import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SalesService } from '../../services/sales.service';
import { Property } from '../../interfaces/saleproperty';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  public cardImage1: string = '../../../assets/house_img/imagen1.jpg';
  public cardImage2: string = '../../../assets/house_img/imagen2.jpg';
  public cardImage3: string = '../../../assets/house_img/imagen3.jpg';
  public propertyData: Property[] = [];

  public constructor(public salesService: SalesService) { }

  public getResponse(uri: string) {
    this.salesService.getSales(uri).subscribe(response => {
      console.log(response);
      this.propertyData = Object.values(response).map((item: any) => item.data);
    })
  }

  ngOnInit(): void {
    const uri: string = 'http://127.0.0.1:8000/sales';
    this.getResponse(uri);
  }
}
