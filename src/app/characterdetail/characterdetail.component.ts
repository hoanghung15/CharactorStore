import { Component, OnInit } from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { CommonModule, NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-characterdetail',
  standalone: true,
  imports: [
    MainheaderComponent,
    MainfooterComponent,
    NgClass,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './characterdetail.component.html',
  styleUrl: './characterdetail.component.css',
})
export class CharacterdetailComponent implements OnInit {
  characterID: any = sessionStorage.getItem('characterID');
  private apiUrl = 'http://localhost/testAPI/api.php';
  character: any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    sessionStorage.setItem('test', this.characterID);
    this.getCharacterInfo(this.characterID);
  }
  getCharacterInfo(id: string): void {
    this.http.get(`${this.apiUrl}?characterID=${id}`).subscribe(
      (response: any) => {
        this.character = response.characterDetail; // Lưu thông tin nhân vật vào biến
        console.log(this.character);
        // Kiểm tra thông tin nhân vật
      },
      (error: any) => {
        // Thêm kiểu cho tham số error
        console.error('Có lỗi khi lấy thông tin nhân vật:', error);
      }
    );
  }
}
