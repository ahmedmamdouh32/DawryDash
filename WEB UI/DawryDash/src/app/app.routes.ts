import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Signup } from './Components/signup/signup';
import { LandingPage } from './Components/landing-page/landing-page';

export const routes: Routes = [
    { path: '', component: LandingPage }, // Empty path
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'home', component: LandingPage },
];
