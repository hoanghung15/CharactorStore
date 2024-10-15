import { Component } from '@angular/core';
import { PromediaXFooterNavComponent } from "../promedia-x-footer-nav/promedia-x-footer-nav.component";
import { ProMeidaXHeaderNavComponent } from "../pro-meida-x-header-nav/pro-meida-x-header-nav.component";

@Component({
  selector: 'app-termofser',
  standalone: true,
  imports: [PromediaXFooterNavComponent, ProMeidaXHeaderNavComponent],
  templateUrl: './termofser.component.html',
  styleUrl: './termofser.component.css'
})
export class TermofserComponent {

}
