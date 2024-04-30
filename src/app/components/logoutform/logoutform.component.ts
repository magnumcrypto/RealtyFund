import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logoutform',
  standalone: true,
  imports: [],
  templateUrl: './logoutform.component.html',
  styleUrl: './logoutform.component.css'
})
export class LogoutformComponent {
  @Input() nickanme: string = '';

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
}
