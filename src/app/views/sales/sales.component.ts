import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SalesService } from '../../services/sales.service';
import { Property } from '../../interfaces/saleproperty';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CardComponent, ModalComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  public propertyData: Property[] = [];

  public titleProperty: string = '';
  public selectedImageValue: string = '';
  public selectedDetailedInfoValue: string = '';
  public zonaValue: string = '';
  public direccionValue: string = '';
  public precioValue: number = 0;
  public descripcionValue: string = '';
  public capitalAportadoValue: number = 0;
  public porcentajeInvertidoValue: number = 0;

  public constructor(public salesService: SalesService) { }

  public getResponse(uri: string) {
    this.salesService.getSales(uri).subscribe(response => {
      console.log("response");
      this.propertyData = Object.values(response).map((item: any) => item.data);
    })
  }

  ngOnInit(): void {
    const uri: string = 'http://127.0.0.1:8000/sales';
    this.getResponse(uri);
  }

  ngOnDestroy(): void {
    console.log("se destruyo sales");
  }
}
