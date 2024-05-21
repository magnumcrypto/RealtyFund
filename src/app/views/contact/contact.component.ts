import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Property } from '../../interfaces/saleproperty';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { NgClass } from '@angular/common';
import { NumberFormatterDirective } from '../../number-formatter.directive';
import { GetUserDataService } from '../../services/get-user-data.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NumberFormatterDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  public salesProperty: Property[] = [];
  public isSucces: boolean = true;
  public nonSuccess: boolean = true;
  public textForNonSuccess: string = '';
  public userData = { nombre: '', apellidos: '', direccion: '', tel: '' };

  constructor(
    public salesService: SalesService,
    public postService: PostService,
    public getUserData: GetUserDataService
  ) { }

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
        Validators.required
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
    if (this.reactiveForm.valid) {
      const formValue = this.reactiveForm.value;
      //console.log(formValue);
      const userData = JSON.stringify(formValue);
      const uri = 'http://127.0.0.1:8000/users';
      this.postService.insertInvestor(uri, userData).subscribe({
        next: (response) => {
          //console.log(response);
          this.isSucces = false;
          this.nonSuccess = true;
        },
        error: (error) => {
          //console.log('Error:', error);
          console.log(error);
          this.textForNonSuccess = 'Error en la inserción!';
          this.nonSuccess = false;
        }
      });
    } else {
      this.textForNonSuccess = 'Datos incorrectos o sin rellenar'
      this.nonSuccess = false;
    }
  }

  ngOnDestroy() {
    this.isSucces = true;
    this.nonSuccess = true;
  }

  onEmailBlur() {
    const email = { email: this.reactiveForm.value.email };
    this.getUserData.getUserData(email).subscribe({
      next: (response) => {
        if (response.ok) {
          this.userData = { ...response.data };
          this.reactiveForm.patchValue({
            nombre: this.userData.nombre,
            apellidos: this.userData.apellidos,
            direccion: this.userData.direccion,
            telefono: this.userData.tel
          })
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
