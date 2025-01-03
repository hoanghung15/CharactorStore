import { CommonModule, NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mainheader',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgClass, CommonModule, HttpClientModule],
  templateUrl: './mainheader.component.html',
  styleUrl: './mainheader.component.css',
})
export class MainheaderComponent implements OnInit {
  avtUrl = sessionStorage.getItem('avtUrl');
  isOpenShoppingCart = false;
  isOpenMenu = false;
  totalPrice: number | null = null;
  charactersIncart: any[] = [];
  userID: any = sessionStorage.getItem('userID');
  private apiUrl = 'http://localhost/testAPI/apiCharacterIncart.php';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getShoppingCartCharacters();
  }
  onToggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
    console.log(this.avtUrl);
  }
  onToggleShoppingCard() {
    this.isOpenShoppingCart = !this.isOpenShoppingCart;
    console.log('dm' + this.userID);
  }
  mapCharacterData(characterData: any[]): any[] {
    return characterData.map((character: any) => ({
      id: character.id,
      name: character.name,
      type: character.type,
      namemovie: character.namemovie,
      author: character.author,
      downloadsize: character.downloadsize,
      texture: character.texture,
      uvlayer: character.uvlayer,
      vertices: character.vertices,
      rigged: character.rigged,
      price: character.price,
      urlView: character.urlView,
      urlBg: character.urlBg,
      countofsold: character.countofsold,
      imgUrl: character.imgUrl,
      bgUrlTop: character.bgUrlTop,
      uploadAt: character.uploadAt,
      typeModel: character.typeModel,
    }));
  }
  getShoppingCartCharacters(): void {
    if (this.userID) {
      this.http
        .get(`${this.apiUrl}?userID=${this.userID}`)
        .subscribe((respone: any) => {
          this.charactersIncart = this.mapCharacterData(
            respone.charactersInCart
          );
          this.totalPriceCal();
          console.log(this.charactersIncart);
        });
    }
  }
  totalPriceCal(): void {
    this.totalPrice = this.charactersIncart.reduce((sum, character) => {
      const price = parseFloat(character.price) || 0; // Chuyển đổi price thành float
      return sum + price; // Cộng giá của từng nhân vật
    }, 0);

    // Kiểm tra nếu totalPrice là null hoặc undefined, gán nó thành 0
    if (this.totalPrice !== null && this.totalPrice !== undefined) {
      // Làm tròn totalPrice đến 2 chữ số thập phân
      this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    } else {
      // Nếu totalPrice là null, gán nó thành 0
      this.totalPrice = 0;
    }
  }
  deleteItem(characterID: any): void {
    if (this.userID && characterID) {
      const payload = {
        userID: this.userID,
        characterID: characterID,
      };

      this.http
        .post('http://localhost/testAPI/apiDeleteCharacter.php', payload)
        .subscribe(
          (response: any) => {
            if (response.success) {
              // Xóa nhân vật khỏi giỏ hàng trên frontend
              this.charactersIncart = this.charactersIncart.filter(
                (character) => character.id !== characterID
              );
              this.totalPriceCal(); // Cập nhật lại tổng giá
              console.log('Item deleted successfully');
            } else {
              console.log('Error deleting item');
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
    location.reload
  }
  setShoppingCartId(charactersIncart: any, userID: any) {
    if (charactersIncart && charactersIncart.length > 0 && userID) {
      const payload = {
        userID: this.userID,
        characters: this.charactersIncart.map(character => character.id),  // Lấy danh sách character_id
      };
  
      // Gửi dữ liệu qua API để insert vào bảng payment
      this.http.post('http://localhost/testAPI/apicheckout.php', payload)
        .subscribe(
          (response: any) => {
            if (response.success) {
              console.log('Payment record inserted successfully');
              // Có thể điều hướng sang trang checkout hoặc thực hiện các hành động khác
            } else {
              console.log('Error inserting payment record');
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }
  
}
