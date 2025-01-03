import { Component, OnInit } from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient để gọi API
import { Observable } from 'rxjs'; // Import Observable để xử lý dữ liệu bất đồng bộ
import { CommonModule, NgClass } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';

@Component({
  selector: 'app-maincharacter',
  standalone: true,
  imports: [
    MainheaderComponent,
    NgClass,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    HammerModule,
    MainfooterComponent,
    RouterLink,
  ],
  templateUrl: './maincharacter.component.html',
  styleUrls: ['./maincharacter.component.css'],
})
export class MaincharacterComponent implements OnInit {
  characters: any[] = [];
  
  lastestCharacter: any[] = [];
  specialCharacter: any[] = []; // List of names from API
  currentIndex: number = 0;
  translateX: number = 0;
  itemWidth: number = 360; // Width of one item including margin
  visibleItems: number = 0; // Number of items visible at once

  private apiUrl = 'http://localhost/api.php'; // Path to API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromServer().subscribe(
      (response) => {
        this.characters = this.mapCharacterData(response.test);
        this.lastestCharacter = this.mapCharacterData(
          response.lastestCharacter
        );
        this.specialCharacter = this.mapCharacterData(
          response.specialCharacter
        );
        console.log(this.characters);
        console.log(this.lastestCharacter);
        console.log(this.specialCharacter);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getDataFromServer(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
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
    }));
  }

  next() {
    // Move to the next set of items
    if (this.currentIndex + this.visibleItems < 3) {
      this.currentIndex++;
      this.translateX -= this.itemWidth;
    }
  }
  tap() {
    console.log('tap');
  }
  previous() {
    // Move to the previous set of items
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.translateX += this.itemWidth;
    }
  }
  setCharacterID(characterID: any) {
    sessionStorage.setItem('characterID', characterID);
  }
}
