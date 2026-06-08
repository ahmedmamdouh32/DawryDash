import { Routes } from '@angular/router';
import { LandingPage } from './Layouts/public-layout/landing-page/landing-page';
import { PublicLayout } from './Layouts/public-layout/public-layout/public-layout';
import { DashboardLayout } from './Layouts/dashboard-layout/dashboard-layout/dashboard-layout';
import { Signup } from './Features/auth/pages/signup/signup';
import { Login } from './Features/auth/pages/login/login';
import { DashboardHome } from './Features/dashboard/pages/dashboard-home/dashboard-home';
import { CreateTeam } from './Features/team/pages/create-team/create-team';
import { TeamDetails } from './Features/team/pages/team-details/team-details';
import { AddTeamMembers } from './Features/team/pages/add-team-members/add-team-members';
import { MyTeams } from './Features/team/pages/my-teams/my-teams';
import { CreateTournament } from './Features/Tournament/pages/create-tournament/create-tournament';

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
                    path: '',
                    redirectTo: 'home',
                    pathMatch: 'full'
                },
                {
                    path: 'home', component: DashboardHome
                },
                {
                    path: 'create-team', component: CreateTeam
                },
                {
                    path: 'teams/:id', component: TeamDetails
                },
                {
                    path: 'teams/:id/members', component: AddTeamMembers
                },
                {
                    path: 'teams', component: MyTeams
                },
                // {
                //     path: 'tournaments'
                // },
                {
                    path: 'create-tournament', component: CreateTournament
                }
            ]
    }, // Empty path


    // { path: 'login', component: Login },
    // { path: 'signup', component: Signup },
    // { path: 'home', component: LandingPage },
];

