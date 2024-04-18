import { Component, OnInit } from '@angular/core';
import { ExitsData } from '../../interfaces/exits';
import { ExitsService } from '../../services/exits.service';
import { MinicardComponent } from '../../components/minicard/minicard.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-exits',
  standalone: true,
  imports: [MinicardComponent, SpinnerComponent],
  templateUrl: './exits.component.html',
  styleUrl: './exits.component.css'
})
export class ExitsComponent implements OnInit {
  public exitsData: ExitsData[] = [];
  public loadding = true;
  public constructor(public exitsService: ExitsService) { }

  public getResponse(uri: string) {
    this.exitsService.getExits(uri).subscribe(response => {
      this.exitsData = Object.values(response).map((item: any) => item.data);
      this.loadding = false;
    })
  }
  ngOnInit(): void {
    const uri: string = 'http://localhost:8000/exits';
    this.getResponse(uri);
  }

  ngOnDestroy(): void {
  }

}
