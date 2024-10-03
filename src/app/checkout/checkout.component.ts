import { Component, OnInit } from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MainheaderComponent,
    MainfooterComponent,
    NgClass,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | null = null;
  charactersIncart: any[] = [];
  tax = 0.8;
  totalBTax: number | null = 0;
  userID: any = sessionStorage.getItem('userID');
  private apiUrl = 'http://localhost/testAPI/apiCharacterIncart.php';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getShoppingCartCharacters();
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
      this.totalBTax = parseFloat((sum + price + this.tax).toFixed(2));
      return sum + price; // Cộng giá của từng nhân vật
    }, 0);

    // Kiểm tra nếu totalPrice là null hoặc undefined, gán nó thành 0
    if (this.totalPrice !== null && this.totalPrice !== undefined) {
      // Làm tròn totalPrice đến 2 chữ số thập phân
      this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    } else {
      // Nếu totalPrice là null, gán nó thành 0
      this.totalPrice = 0;
      this.totalBTax = 0;
    }
    location.reload;
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
    location.reload;
  }
  setInformation(country: any, city: any, street: any, postcode: any,note:any) {
    sessionStorage.setItem('country', country);
    sessionStorage.setItem('city', city);
    sessionStorage.setItem('street', street);
    sessionStorage.setItem('postcode', postcode);
    sessionStorage.setItem('note', note);
  }
}
