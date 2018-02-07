import { RouterModule,Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { LoginComponent } from 'app/login/login.component';
import { SignupComponent } from 'app/signup/signup.component';
import { VerificationComponent } from 'app/verification/verification.component';
import { UpdateProfileComponent } from 'app/update-profile/update-profile.component';
import { HomeComponent } from 'app/home/home.component';
import { TheGameComponent } from 'app/the-game/the-game.component';
import { BuyTokensComponent } from 'app/buy-tokens/buy-tokens.component';

export const AppRoutes:Routes = [
    {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'verify',
        component:VerificationComponent
    },
    {
        path:'game',
        component:TheGameComponent,
        children:[
            {
            path: 'dashboard',
            component: DashboardComponent,
            },
            {
                path: 'user',
                component: UserComponent
            },
            {
                path:'updateProfile',
                component:UpdateProfileComponent
            },
            {
                path: 'leaderboard',
                component: TableComponent
            },
            {
                path: 'about',
                component: TypographyComponent
            },
            {
                path: 'team',
                component: IconsComponent
            },
            {
                path: 'maps',
                component: MapsComponent
            },
            {
                path: 'notifications',
                component: NotificationsComponent
            },
            {
                path:'buyTokens',
                component:BuyTokensComponent
            }
        ]
    },
  

]
