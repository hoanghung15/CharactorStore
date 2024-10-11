import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProMeidaXHeaderNavComponent } from '../pro-meida-x-header-nav/pro-meida-x-header-nav.component';
import { PromediaXFooterNavComponent } from '../promedia-x-footer-nav/promedia-x-footer-nav.component';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ProMeidaXHeaderNavComponent, PromediaXFooterNavComponent], // Thêm FormsModule ở đây
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs
      .sendForm('service_b0vr6zq', 'template_r4ctkfl', e.target as HTMLFormElement, {
        publicKey: 'dtYjBJNaEWSw3IHLc',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }
}
