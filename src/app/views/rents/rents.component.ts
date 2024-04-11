import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Property } from '../../interfaces/rentproperty';
import { RentsService } from '../../services/rents.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-rents',
  standalone: true,
  imports: [CardComponent, ModalComponent],
  templateUrl: './rents.component.html',
  styleUrl: './rents.component.css'
})
export class RentsComponent implements OnInit {
  public propertyData: Property[] = [];

  public titleProperty: string = '';
  public selectedImageValue: string = '';
  public selectedDetailedInfoValue: string = '';
  public zonaValue: string = '';
  public direccionValue: string = '';
  public precioValue: number = 0;
  public descripcionValue: string = '';

  public constructor(public rentsService: RentsService) { }

  public getResponse(uri: string) {
    this.rentsService.getRents(uri).subscribe(response => {
      this.propertyData = Object.values(response).map((item: any) => item.data);
    })
  }
  ngOnInit(): void {
    const uri: string = 'http://127.0.0.1:8000/rents';
    this.getResponse(uri);
  }

  ngOnDestroy(): void {
    console.log("se destruyo rents");
  }
}
