import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterLink, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  private apiUrl = 'http://localhost/testAPI/apiSignUp.php';

  constructor(private http: HttpClient, private router: Router) {}

  signup(
    firstname: any,
    lastname: any,
    phoneNumber: any,
    email: any,
    brithday: any,
    password: any,
    tickbox: any
  ) {
    // Gửi dữ liệu kèm theo trạng thái của tickbox
    const body = {
      firstname,
      lastname,
      phoneNumber,
      email,
      brithday,
      password,
      tickbox,
    };
    this.http.post(this.apiUrl, body).subscribe(
      (response: any) => {
        console.log(response); // Xử lý phản hồi từ server
        if (response['success']) {
          alert('Đăng kí thành công');
          this.router.navigate(['/signin']);

          // Đăng ký thành công, xử lý logic tiếp theo
        } else {
          alert('Mail đã tồn tại');
          // Xử lý trường hợp thất bại
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
