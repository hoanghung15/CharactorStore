import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mainheader',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgClass, CommonModule],
  templateUrl: './mainheader.component.html',
  styleUrl: './mainheader.component.css',
})
export class MainheaderComponent {
  avtUrl = sessionStorage.getItem('avtUrl');
  isOpenMenu = false;
  onToggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
    console.log(this.avtUrl);
  }
}
