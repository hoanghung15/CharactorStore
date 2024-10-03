import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MaincharacterComponent } from './maincharacter/maincharacter.component';
import { authGuard } from './auth.guard';
import { TestComponent } from './test/test.component';
import { MusicComponent } from './music/music.component';
import { CharacterdetailComponent } from './characterdetail/characterdetail.component';
import { AllmodelComponent } from './allmodel/allmodel.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'homepage',
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
    path: 'test',
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
  {
    path: 'characterdetail',
    component: CharacterdetailComponent,
  },
  {
    path: 'allmodel',
    component: AllmodelComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
];
