import { Routes } from '@angular/router';
import { Login } from './Layouts/public-layout/login/login';
import { Signup } from './Layouts/public-layout/signup/signup';
import { LandingPage } from './Layouts/public-layout/landing-page/landing-page';
import { PublicLayout } from './Layouts/public-layout/public-layout/public-layout';
import { DashboardLayout } from './Layouts/dashboard-layout/dashboard-layout/dashboard-layout';
import { DashboardHome } from './Layouts/dashboard-layout/dashboard-home/dashboard-home';

export const routes: Routes = [
    {
        path: '', component: PublicLayout,
        children:
            [
                {
                    path: '', component: LandingPage
                },
                {
                    path: 'login',
                    component: Login
                }
                ,
                {
                    path: 'signup',
                    component: Signup
                }
            ]
    }, // Empty path



    {
        path: 'dashboard', component: DashboardLayout,
        children:
            [
                {
                    path: '', component: DashboardHome
                }
            ]
    }, // Empty path


    // { path: 'login', component: Login },
    // { path: 'signup', component: Signup },
    // { path: 'home', component: LandingPage },
];

