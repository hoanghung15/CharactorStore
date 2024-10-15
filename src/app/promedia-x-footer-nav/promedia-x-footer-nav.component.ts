import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promedia-x-footer-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './promedia-x-footer-nav.component.html',
  styleUrl: './promedia-x-footer-nav.component.css',
})
export class PromediaXFooterNavComponent {}
