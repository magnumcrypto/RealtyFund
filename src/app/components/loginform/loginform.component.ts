import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle, NgClass],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  public inputPassType: string = 'password';
  public inputConfirmPassType: string = 'password';
  public isTheSame: boolean | undefined;
  public isRegistred: boolean = false;
  public errorStatus: boolean = true;
  public errorStatusLogin: boolean = true;
  public isHiddden: boolean = true;
  public isLogin: boolean = false;

  constructor(public postService: PostService) { }

  onSignUp(): void {
    const userForms = document.getElementById('user_options-forms');
    if (userForms) {
      userForms.classList.remove('bounceRight');
      userForms.classList.add('bounceLeft');
    }

  }

  onLogin(): void {
    const userForms = document.getElementById('user_options-forms');
    if (userForms) {
      userForms.classList.remove('bounceLeft');
      userForms.classList.add('bounceRight');
    }
  }

  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  registerFormGroup = new FormGroup({
    username: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/),
        Validators.email
      ]
    ),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]+$/)
      ]),
    confirmPassword: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]+$/)
      ]
    )
  })

  onLoginSubmit() {
    this.isHiddden = false;
    if (this.loginFormGroup.valid) {
      console.log(this.loginFormGroup.value)
      //Enviar datos al servidor´
      const uri: string = 'http://localhost:8000/login';
      const userData = this.loginFormGroup.value;
      this.postService.loginUser(uri, userData).subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log(response);
            this.isHiddden = true;
            this.isLogin = true;
          }
        },
        error: (error) => {
          console.log('Error: ', error.ok);
          this.errorStatusLogin = error.ok;
          if (!error.ok) {
            this.isHiddden = true;
          }
        }
      })
    } else {
      this.isHiddden = true;
    }
  }

  onRegisterSubmit() {
    this.isHiddden = false;
    const password = this.registerFormGroup.value.password;
    const confirmPassword = this.registerFormGroup.value.confirmPassword;
    if (password === confirmPassword) {
      this.isTheSame = true;
      if (this.registerFormGroup.valid) {
        //Enviar datos al servidor
        const uri: string = 'http://localhost:8000/register';
        const dataUser = JSON.stringify(this.registerFormGroup.value);
        this.postService.registerUser(uri, dataUser).subscribe({
          next: (response) => {
            if (response.status === 201) {
              this.isRegistred = true;
              this.isHiddden = true;
            }
          },
          error: (error) => {
            console.log('Error: ', error.ok);
            this.errorStatus = error.ok;
            if (!error.ok) {
              this.isHiddden = true;
            }
          }
        })
      } else {
        this.isHiddden = true;
      }
    } else {
      //Mostrar en el formulario aviso
      this.isTheSame = false;
      this.isHiddden = true;
    }
  }

  showPass(numb: number) {
    if (numb === 1) { this.inputPassType = 'text'; }
    if (numb === 0) { this.inputConfirmPassType = 'text'; }
  }
  hidePass(numb: number) {
    if (numb === 1) { this.inputPassType = 'password'; }
    if (numb === 0) { this.inputConfirmPassType = 'password'; }
  }
  resetForm() {
    this.registerFormGroup.reset();
    this.loginFormGroup.reset();
    this.errorStatus = true;
    this.errorStatusLogin = true;
    this.isLogin = false;
    this.isRegistred = false;
  }
}
