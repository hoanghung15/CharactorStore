import { Component, OnInit } from '@angular/core';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router'; // Import Router service for navigation

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MainfooterComponent, MainheaderComponent, NgClass, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'], // Fixed styleUrl to styleUrls
})
export class PaymentComponent implements OnInit {
  isOpenVali = false;
  avtUrl = sessionStorage.getItem('avtUrl');
  firstname = sessionStorage.getItem('firstname');
  lastname = sessionStorage.getItem('lastname');
  country = sessionStorage.getItem('country');
  city = sessionStorage.getItem('city');
  street = sessionStorage.getItem('street');
  postcode = sessionStorage.getItem('postcode');
  note = sessionStorage.getItem('note');
  userID: any = sessionStorage.getItem('userID');
  private apiUrl = 'http://localhost/testAPI/apiCharacterIncart.php';
  private apiUrlDelete = 'http://localhost/testAPI/apiDeleteCharacter.php';
  
  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  charactersIncart: any[] = [];
  tax = 0.8;
  totalBTax: number | null = 0;
  totalPrice: number | null = null;

  ngOnInit(): void {
    this.getShoppingCartCharacters();
  }

  // Map character data from API response
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
      linkFile: character.linkFile,
    }));
  }

  // Get shopping cart characters from API
  getShoppingCartCharacters(): void {
    if (this.userID) {
      this.http.get(`${this.apiUrl}?userID=${this.userID}`).subscribe((response: any) => {
        this.charactersIncart = this.mapCharacterData(response.charactersInCart);
        this.totalPriceCal();
        console.log(this.charactersIncart);
      });
    }
  }

  // Calculate total price including tax
  totalPriceCal(): void {
    this.totalPrice = this.charactersIncart.reduce((sum, character) => {
      const price = parseFloat(character.price) || 0;
      return sum + price; // Sum prices
    }, 0);
    
    this.totalBTax = this.totalPrice ? parseFloat((this.totalPrice + this.tax).toFixed(2)) : 0;
    
    // Ensure totalPrice is rounded to two decimal places
    this.totalPrice = this.totalPrice ? parseFloat(this.totalPrice.toFixed(2)) : 0;
  }

  // Toggle validation state
  validate(): void {
    this.isOpenVali = !this.isOpenVali;
  }

  // Download character files and delete from cart
  downloadFile(): void {
    if (this.charactersIncart && this.charactersIncart.length > 0) {
      this.charactersIncart.forEach((character, index) => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = character.linkFile;
          link.download = character.name; 
          link.target = '_blank'; 
          link.click();
          this.deleteItem(character.id);
        }, index * 1000);
      });

      // Navigate after all downloads are initiated
      setTimeout(() => {
        this.router.navigate(['/maincharacter']); // Update '/some-route' to your desired route
      }, this.charactersIncart.length * 1000);
      
      this.isOpenVali = false; // Close validation
    } else {
      console.log('No characters in the cart to download.');
    }
  }

  // Delete item from cart
  deleteItem(characterID: any): void {
    if (this.userID && characterID) {
      const payload = {
        userID: this.userID,
        characterID: characterID,
      };

      this.http.post(this.apiUrlDelete, payload).subscribe(
        (response: any) => {
          if (response.success) {
            // Remove character from charactersIncart
            this.charactersIncart = this.charactersIncart.filter(character => character.id !== characterID);
            this.totalPriceCal(); // Recalculate total price
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
  }
}
