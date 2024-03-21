import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public styleOne: boolean = false;
  public styleTwo: boolean = false;
  public styleThree: boolean = false;
  public styleFour: boolean = false;
  public styleFive: boolean = false;

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
}
