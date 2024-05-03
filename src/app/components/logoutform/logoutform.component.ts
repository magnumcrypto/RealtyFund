import { Component, Inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logoutform',
  standalone: true,
  imports: [],
  templateUrl: './logoutform.component.html',
  styleUrl: './logoutform.component.css'
})
export class LogoutformComponent {
  public user: any = '';

  constructor(private postService: PostService, @Inject(DOCUMENT) private document: Document) { }

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

  onSubmitLogOut(event: any) {
    //prevenir que el boton haga submit
    event?.preventDefault();
    const uri = 'http://localhost:8000/logout';
    this.postService.logoutUser(uri).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.removeItem('user');
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onSubmitDelete() {
  }

  ngOnInit(): void {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.user);
    } else {
      console.log('No se pudo obtener el localStorage');
    }
  }
}
