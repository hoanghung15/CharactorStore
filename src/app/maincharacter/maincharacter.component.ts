import { Component, OnInit } from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient để gọi API
import { Observable } from 'rxjs'; // Import Observable để xử lý dữ liệu bất đồng bộ
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-maincharacter',
  standalone: true,
  imports: [
    MainheaderComponent,
    NgClass,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
  ],
  templateUrl: './maincharacter.component.html',
  styleUrls: ['./maincharacter.component.css'],
})
export class MaincharacterComponent implements OnInit {
  names: string[] = []; // Mảng để lưu tất cả tên

  private apiUrl = 'http://localhost/api.php'; // Đường dẫn tới API PHP

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromServer().subscribe(
      (response) => {
        this.names = response.names; // Gán danh sách tên từ API
        console.log(this.names);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getDataFromServer(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
