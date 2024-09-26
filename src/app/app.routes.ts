import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
];
