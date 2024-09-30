import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-pro-meida-x-header-nav',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './pro-meida-x-header-nav.component.html',
  styleUrl: './pro-meida-x-header-nav.component.css',
})
export class ProMeidaXHeaderNavComponent {
  isOpenMenu = false;
  onToggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
    console.log('clicked');
  }
  testclick(txt: any) {
    // sessionStorage.setItem('isloggin', 'false');
    sessionStorage.setItem('router', txt);
  }
}
