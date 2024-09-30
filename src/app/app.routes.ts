import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MaincharacterComponent } from './maincharacter/maincharacter.component';
import { authGuard } from './auth.guard';
import { TestComponent } from './test/test.component';
import { MusicComponent } from './music/music.component';

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
    canActivate: [authGuard],
  },
  {
    path: 'signin/testr',
    component: TestComponent,
  },
  {
    path: 'signin/maincharacter',
    component: MaincharacterComponent,
  },
  {
    path: 'music',
    component: MusicComponent,
    canActivate: [authGuard],
  },
];
