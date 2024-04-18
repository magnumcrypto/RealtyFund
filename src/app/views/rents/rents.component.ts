import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Property } from '../../interfaces/rentproperty';
import { RentsService } from '../../services/rents.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-rents',
  standalone: true,
  imports: [CardComponent, ModalComponent, ToolbarComponent, SpinnerComponent],
  templateUrl: './rents.component.html',
  styleUrl: './rents.component.css'
})
export class RentsComponent implements OnInit {
  public propertyData: Property[] = [];
  public uriRents = 'http://127.0.0.1:8000/rents';
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
  public constructor(public rentsService: RentsService) { }

  public getResponse(uri: string) {
    this.rentsService.getRents(uri).subscribe(response => {
      this.propertyData = Object.values(response).map((item: any) => item.data);
      this.loadding = false;
    })
  }
  ngOnInit(): void {
    const uri: string = 'http://127.0.0.1:8000/rents';
    this.getResponse(uri);
  }

  ngOnDestroy(): void {
  }

  public handleResponseData(responseData: any) {
    this.propertyData = Object.values(responseData).map((item: any) => item.data);
    console.log(this.propertyData);
  }
}
