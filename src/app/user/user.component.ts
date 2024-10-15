import { Component, inject } from '@angular/core';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MainheaderComponent, MainfooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  avtUrl = sessionStorage.getItem('avtUrl');
  firstname = sessionStorage.getItem('firstname');
  lastname = sessionStorage.getItem('lastname');
  email = sessionStorage.getItem('email');
  phonenumber = sessionStorage.getItem('phonenumber');
  birthday = sessionStorage.getItem('birthday');
  password = sessionStorage.getItem('password');
  uploadProgress$!: Observable<number>;
  downloadURL$!: Observable<string>;

  private storage: Storage = inject(Storage);
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const archivoSeleccionado: File = event.target.files[0];
    this.uploadFile(archivoSeleccionado);
  }

  async uploadFile(file: File) {
    const filePath = `archivos/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);

    uploadFile.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Progreso de la carga:', progress);
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      },
      async () => {
        console.log('el archivo se subio exitosamente!');
        const url = await getDownloadURL(fileRef);
        this.avtUrl = url;
        sessionStorage.setItem('avtUrl', url);
        console.log('url del archivo: ', url);
        location.reload;
      }
    );
  }
  updateInfor(
    firstnametxt: any,
    lastnametxt: any,
    phonenumbertxt: any,
    birthdaytxt: any,
    passwordtxt: any
  ): void {
    const avtUrl = this.avtUrl; // Lấy avtUrl từ sessionStorage
    const userData = {
      firstname: firstnametxt,
      lastname: lastnametxt,
      phonenumber: phonenumbertxt,
      birthday: birthdaytxt,
      password: passwordtxt,
      avtUrl: avtUrl,
    };
    sessionStorage.setItem('firstname', firstnametxt);
    sessionStorage.setItem('lastname', lastnametxt);
    sessionStorage.setItem('birthday', birthdaytxt);
    sessionStorage.setItem('password', passwordtxt);
    this.http
      .post('http://localhost/testAPI/updateInfor.php', userData)
      .subscribe(
        (response) => {
          console.log(response);
          alert('Upload Successed!');
          location.reload;
        },
        (error) => {
          console.error('Lỗi khi gọi API:', error);
        }
      );
  }
}
