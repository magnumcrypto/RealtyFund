import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SalesService } from '../../services/sales.service';
import { Property } from '../../interfaces/saleproperty';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CardComponent, ModalComponent, ToolbarComponent, SpinnerComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  public propertyData: Property[] = [];
  public uriSales = 'http://127.0.0.1:8000/sales';
  public titleProperty: string = '';
  public selectedImageValue: string = '';
  public selectedDetailedInfoValue: string = '';
  public zonaValue: string = '';
  public direccionValue: string = '';
  public precioValue: number = 0;
  public descripcionValue: string = '';
  public capitalAportadoValue: number = 0;
  public porcentajeInvertidoValue: number = 0;
  public loadding = true;

  public constructor(public salesService: SalesService) { }

  public getResponse(uri: string) {
    this.salesService.getSales(uri).subscribe(response => {
      //console.log("response");
      this.propertyData = Object.values(response).map((item: any) => item.data);
      this.loadding = false;
    })
  }

  ngOnInit(): void {
    const uri: string = 'http://127.0.0.1:8000/sales';
    this.getResponse(uri);
  }

  ngOnDestroy(): void {
  }

  public handleResponseData(responseData: any) {
    this.propertyData = Object.values(responseData).map((item: any) => item.data);
    //console.log(this.propertyData);
  }
}
