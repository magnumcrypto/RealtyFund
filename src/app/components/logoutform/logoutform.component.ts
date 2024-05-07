import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post.service';
import { DOCUMENT } from '@angular/common';
import { UserLoginService } from '../../services/user-login.service';

@Component({
  selector: 'app-logoutform',
  standalone: true,
  imports: [],
  templateUrl: './logoutform.component.html',
  styleUrl: './logoutform.component.css'
})
export class LogoutformComponent {
  public user: any;
  @Output() responseData = new EventEmitter<boolean>();

  constructor(private postService: PostService, private userService: UserLoginService) { }

  onLogout(): void {
    const userForms = document.getElementById('user_options-forms2');
    if (userForms) {
      userForms.classList.remove('bounceRight');
      userForms.classList.add('bounceLeft');
    }
  }

  onDelete(): void {
    const userForms = document.getElementById('user_options-forms2');
    if (userForms) {
      userForms.classList.remove('bounceLeft');
      userForms.classList.add('bounceRight');
    }
  }

  onSubmitLogOut() {
    const uri = 'http://localhost:8000/logout';
    this.postService.logoutUser(uri).subscribe({
      next: (response: any) => {
        //console.log(response);
        if (response.status === 200) {
          localStorage.removeItem('user');
          this.responseData.emit(false);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onSubmitDelete(event: any) {
    const uri = 'http://localhost:8000/delete';
    console.log(this.user);
    this.postService.deleteUser(uri, this.user).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          localStorage.removeItem('user');
          this.responseData.emit(false);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.userService.getUserObservable().subscribe(user => {
      this.user = user;
    });
    this.user = this.userService.getUser();
  }
}
