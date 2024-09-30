import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  test1: string | null = sessionStorage.getItem('router');

  login(a: any, b: any) {
    if (a == '1' && b == '1') {
      sessionStorage.setItem('isloggin', 'true');
      console.log(this.test1);
    } else {
      sessionStorage.setItem('isloggin', 'false');
    }
  }
}
