import { Component } from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allmodel',
  standalone: true,
  imports: [
    MainheaderComponent,
    MainfooterComponent,
    NgClass,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './allmodel.component.html',
  styleUrl: './allmodel.component.css',
})
export class AllmodelComponent {
  private apiUrl = 'http://localhost/api.php'; // Path to API
  charactersCN: any[] = [];
  archi: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromServer().subscribe(
      (response) => {
        this.charactersCN = this.mapCharacterData(response.characterCN);
        console.log(this.charactersCN);
        this.archi = this.mapCharacterData(response.Architecture);
        console.log(this.archi);
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
  setCharacterID(characterID: any) {
    sessionStorage.setItem('characterID', characterID);
  }
}
