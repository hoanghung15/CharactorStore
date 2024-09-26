import { Component } from '@angular/core';
import { PromediaXFooterNavComponent } from "../promedia-x-footer-nav/promedia-x-footer-nav.component";
import { ProMeidaXHeaderNavComponent } from "../pro-meida-x-header-nav/pro-meida-x-header-nav.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [PromediaXFooterNavComponent, ProMeidaXHeaderNavComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
  
})
export class HomepageComponent {
  crollToTop(){
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
}
