import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient để gọi API
import { Observable } from 'rxjs'; // Import Observable để xử lý dữ liệu bất đồng bộ

@Component({
  selector: 'app-serverapi',
  standalone: true,
  imports: [],
  templateUrl: './serverapi.component.html',
  styleUrls: ['./serverapi.component.css'],
})
export class ServerapiComponent implements OnInit {
  nameCharactor: string = ''; // Biến để lưu giá trị từ bảng charactor

  private apiUrl = 'http://localhost/api.php'; // Đường dẫn tới API PHP

  constructor(private http: HttpClient) {}

  // Hàm ngOnInit sẽ chạy khi component khởi tạo
  ngOnInit(): void {
    this.getDataFromServer().subscribe(
      (response) => {
        this.nameCharactor = response.name_charactor; // Gán dữ liệu từ bảng charactor
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Hàm lấy dữ liệu từ API bằng HttpClient
  getDataFromServer(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
}