import { NgClass, NgStyle } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { UserLoginService } from '../../services/user-login.service';

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
  public isHidden: boolean = true;
  public isLogin: boolean = false;

  @Output() responseData = new EventEmitter<boolean>();

  constructor(public postService: PostService, private userService: UserLoginService) { }

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
    nickname: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
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
    this.isHidden = false;
    if (this.loginFormGroup.valid) {
      //Enviar datos al servidor
      const uri: string = 'http://localhost:8000/login';
      const userData = this.loginFormGroup.value;
      this.postService.loginUser(uri, userData).subscribe({
        next: (response) => {
          if (response.status === 200) {
            //console.log(response);
            //introducimos los datos el usuario en el localSotrage
            const user =
            {
              nickname: response.nickname,
              username: response.email,
              token: response.token
            };
            this.userService.setUser(user);
            this.isHidden = true;
            this.isLogin = true;
            this.responseData.emit(true);
            this.resetForm();
            const close = document.getElementById('signout');
            close?.click();

          }
        },
        error: (error) => {
          console.log('Error: ', error.ok);
          this.errorStatusLogin = error.ok;
          if (!error.ok) {
            this.isHidden = true;
          }
        }
      })
    } else {
      this.isHidden = true;
    }
  }

  onRegisterSubmit() {
    this.isHidden = false;
    const password = this.registerFormGroup.value.password;
    const confirmPassword = this.registerFormGroup.value.confirmPassword;
    if (password === confirmPassword) {
      this.isTheSame = true;
      if (this.registerFormGroup.valid) {
        //Enviar datos al servidor
        const uri: string = 'http://localhost:8000/register';
        const dataUser = this.registerFormGroup.value;
        this.postService.registerUser(uri, dataUser).subscribe({
          next: (response) => {
            if (response.status === 201) {
              this.isRegistred = true;
              this.isHidden = true;
              this.resetForm();
              const close = document.getElementById('signout');
              close?.click();
            }
          },
          error: (error) => {
            console.log('Error: ', error.ok);
            this.errorStatus = error.ok;
            if (!error.ok) {
              this.isHidden = true;
            }
          }
        })
      } else {
        this.isHidden = true;
      }
    } else {
      //Mostrar en el formulario aviso
      this.isTheSame = false;
      this.isHidden = true;
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
