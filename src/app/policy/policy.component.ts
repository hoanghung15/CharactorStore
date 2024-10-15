import { Component } from '@angular/core';
import { PromediaXFooterNavComponent } from "../promedia-x-footer-nav/promedia-x-footer-nav.component";
import { ProMeidaXHeaderNavComponent } from "../pro-meida-x-header-nav/pro-meida-x-header-nav.component";

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [PromediaXFooterNavComponent, ProMeidaXHeaderNavComponent],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css'
})
export class PolicyComponent {

}
