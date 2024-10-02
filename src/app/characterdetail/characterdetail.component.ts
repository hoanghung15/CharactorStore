import { Component, OnInit } from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { CommonModule, NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
  userID: any = sessionStorage.getItem('userID');
  private apiUrl = 'http://localhost/testAPI/api.php';
  character: any;
  isViewModel3D = false;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
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
  clickViewModel3D() {
    this.isViewModel3D = !this.isViewModel3D;
    console.log(this.character.urlView);
  }
  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.character.urlView
    );
  }
  addToCart() {
    const characterID = this.characterID;
    const userID = this.userID;
    const dateAdded = new Date().toISOString().slice(0, 19).replace('T', ' '); // Lấy ngày hiện tại
    const cartData = {
      userID: userID,
      characterID: characterID,
      dateAdded: dateAdded,
    };
    this.http.post(`${this.apiUrl}/addToCart`, cartData).subscribe(
      (response: any) => {
        console.log('Đã thêm vào giỏ hàng:', response);
        alert('Thêm vào giỏ hàng thành công!');
      },
      (error: any) => {
        console.error('Có lỗi khi thêm vào giỏ hàng:', error);
        alert('Lỗi khi thêm vào giỏ hàng.');
      }
    );
  }
}
