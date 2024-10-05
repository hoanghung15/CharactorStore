import { Component, OnInit } from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filter-sort',
  standalone: true,
  imports: [MainheaderComponent, MainfooterComponent, NgClass, CommonModule,RouterLink],
  templateUrl: './filter-sort.component.html',
  styleUrl: './filter-sort.component.css',
})
export class FilterSortComponent implements OnInit {
  constructor(private http: HttpClient) {}
  allcharacter: any[] = [];
  private apiUrl = 'http://localhost/api.php';
  ngOnInit(): void {
    this.getDataFromServer().subscribe((response) => {
      this.allcharacter = this.mapCharacterData(
        response.allCharacterIndatabase
      );
      console.log(this.allcharacter);
    });
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
  setCharacterID(characterID: any) {
    sessionStorage.setItem('characterID', characterID);
  }
}
