import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MaincharacterComponent } from './maincharacter/maincharacter.component';
import { TestcomComponent } from './testcom/testcom.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'maincharacter',
    component: MaincharacterComponent,
  },
  {
    path:'test',component:TestcomComponent
  }
];
