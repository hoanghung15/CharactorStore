import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filter-sort',
  standalone: true,
  imports: [
    MainheaderComponent,
    MainfooterComponent,
    NgClass,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.css'],
})
export class FilterSortComponent implements OnInit, AfterViewInit {
  @ViewChild('handle1') handle1!: ElementRef;
  @ViewChild('handle2') handle2!: ElementRef;
  @ViewChild('track') track!: ElementRef;
  @ViewChild('middleDiv') middleDiv!: ElementRef;

  // Giá trị động cho giá trị của filter
  value1: number = 0;
  value2: number = 100;

  allcharacter: any[] = [];
  private apiUrl = 'http://localhost/testAPI/test.php';

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Lấy dữ liệu khi khởi động
    this.getDataFromServer().subscribe((response) => {
      this.allcharacter = this.mapCharacterData(
        response.allCharacterIndatabase
      );
      console.log(this.allcharacter);
    });
  }

  ngAfterViewInit(): void {
    // Khởi tạo chức năng kéo thả
    this.initializeDrag();
  }

  // Lấy dữ liệu từ server
  getDataFromServer(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Ánh xạ dữ liệu nhân vật từ server
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

  // Lưu ID nhân vật vào session
  setCharacterID(characterID: any) {
    sessionStorage.setItem('characterID', characterID);
  }

  // Lọc nhân vật theo khoảng giá
  filterCharactersByPrice() {
    const url = `${this.apiUrl}?value1=${this.value1}&value2=${this.value2}`;
    this.http.get<any>(url).subscribe((response) => {
      this.allcharacter = this.mapCharacterData(response.filteredCharacters);
      console.log(this.allcharacter);
    });
  }

  // Khởi tạo chức năng kéo thả cho slider
  initializeDrag() {
    const handle1El = this.handle1.nativeElement;
    const handle2El = this.handle2.nativeElement;
    const trackEl = this.track.nativeElement;
    const middleDivEl = this.middleDiv.nativeElement;

    let isDragging1 = false;
    let isDragging2 = false;

    const updateValues = () => {
      const trackWidth = trackEl.offsetWidth;
      this.value1 = Math.round((handle1El.offsetLeft / trackWidth) * 100);
      this.value2 = Math.round(
        ((handle2El.offsetLeft + handle2El.offsetWidth) / trackWidth) * 100
      );
      this.filterCharactersByPrice(); // Gọi API khi giá trị thay đổi
    };

    const updateMiddleDiv = () => {
      const left = handle1El.offsetLeft + handle1El.offsetWidth;
      const width = handle2El.offsetLeft - left;
      this.renderer.setStyle(middleDivEl, 'left', `${left}px`);
      this.renderer.setStyle(middleDivEl, 'width', `${width}px`);
      updateValues(); // Cập nhật giá trị khi kéo
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging1) {
        let newLeft =
          event.clientX -
          trackEl.getBoundingClientRect().left -
          handle1El.offsetWidth / 2;
        newLeft = Math.max(0, newLeft);
        newLeft = Math.min(
          newLeft,
          handle2El.offsetLeft - handle1El.offsetWidth
        );
        this.renderer.setStyle(handle1El, 'left', `${newLeft}px`);
        updateMiddleDiv();
      }

      if (isDragging2) {
        let newRight =
          event.clientX -
          trackEl.getBoundingClientRect().left -
          handle2El.offsetWidth / 2;
        newRight = Math.max(
          handle1El.offsetLeft + handle1El.offsetWidth,
          newRight
        );
        newRight = Math.min(
          newRight,
          trackEl.offsetWidth - handle2El.offsetWidth
        );
        this.renderer.setStyle(handle2El, 'left', `${newRight}px`);
        updateMiddleDiv();
      }
    };

    this.renderer.listen(handle1El, 'mousedown', () => (isDragging1 = true));
    this.renderer.listen(handle2El, 'mousedown', () => (isDragging2 = true));

    this.renderer.listen('document', 'mousemove', onMouseMove);
    this.renderer.listen('document', 'mouseup', () => {
      isDragging1 = false;
      isDragging2 = false;
    });

    updateMiddleDiv(); // Set vị trí ban đầu cho middleDiv
  }
}
