import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProMeidaXHeaderNavComponent } from './pro-meida-x-header-nav/pro-meida-x-header-nav.component';
import { PromediaXFooterNavComponent } from './promedia-x-footer-nav/promedia-x-footer-nav.component';
import { SigninComponent } from './signin/signin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SigninComponent,
    HomepageComponent,
    ProMeidaXHeaderNavComponent,
    PromediaXFooterNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CharacterStore';
}
