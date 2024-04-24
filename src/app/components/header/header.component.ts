import { NgClass } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { LoginformComponent } from '../loginform/loginform.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, LoginformComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public styleOne: boolean = false;
  public styleTwo: boolean = false;
  public styleThree: boolean = false;
  public styleFour: boolean = false;
  public styleFive: boolean = false;

  @Output() showModal = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }

  public activeStyle(style: number): void {
    this.styleOne = false;
    this.styleTwo = false;
    this.styleThree = false;
    this.styleFour = false;
    this.styleFive = false;
    if (style === 1) {
      this.styleOne = true;
    }
    if (style === 2) {
      this.styleTwo = true;
    }
    if (style === 3) {
      this.styleThree = true;
    }
    if (style === 4) {
      this.styleFour = true;
    }
    if (style === 5) {
      this.styleFive = true;
    }
  }

  public onButtonClick() {
    this.showModal.emit();
  }
}
