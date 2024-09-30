import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  private apiUrl = 'http://localhost/loginapi.php';
  test1: string | null = sessionStorage.getItem('router');

  constructor(private http: HttpClient) {}
  login(email: any, password: any) {
    const body = { email, password };
    this.http.post<any>(this.apiUrl, body).subscribe((respone) => {
      if (respone.success) {
        sessionStorage.setItem('isloggin', 'true');
        console.log(this.test1);
      } else {
        sessionStorage.setItem('isloggin', 'false');
        alert('Email hoặc mật khẩu không đúng');
      }
      sessionStorage.setItem('userID', respone.user_id);
      sessionStorage.setItem('avtUrl', respone.avtUrl);
    });
  }
}
