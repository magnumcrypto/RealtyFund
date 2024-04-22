import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Property } from '../../interfaces/saleproperty';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  public salesProperty: Property[] = [];

  constructor(public salesService: SalesService, public postService: PostService) { }

  reactiveForm = new FormGroup({
    nombre: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(30)
      ]),
    apellidos: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(100)
      ]),
    direccion: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(255)
      ]),
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/),
        Validators.email
      ]),
    telefono: new FormControl('',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(11)
      ]),
    capital: new FormControl('',
      [
        Validators.required,
        Validators.min(0)
      ]),
    property: new FormControl('', [Validators.required])
  })

  public getResponse(uri: string) {
    this.salesService.getSales(uri).subscribe(response => {
      this.salesProperty = Object.values(response).map((item: any) => item.data);
    })
  }

  ngOnInit(): void {
    const uri: string = 'http://127.0.0.1:8000/sales';
    this.getResponse(uri);
  }

  onSubmit() {
    const formValue = this.reactiveForm.getRawValue();
    console.log(formValue)
    const userData = JSON.stringify(formValue);
    const uri = 'http://127.0.0.1:8000/users';
    this.postService.insertInvestor(uri, userData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log('Error:', error)
      }
    });
  }
}
