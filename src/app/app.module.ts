import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {LoginService} from '../services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerificationComponent } from './verification/verification.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { FormsModule } from '@angular/forms';
import { AuthorisationService } from 'app/authorisation.service';
import { HomeComponent } from './home/home.component';
import { TheGameComponent } from './the-game/the-game.component';
import { BuyTokensComponent } from './buy-tokens/buy-tokens.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    SignupComponent,
    VerificationComponent,
    UpdateProfileComponent,
    HomeComponent,
    TheGameComponent,
    BuyTokensComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FormsModule,
    FixedPluginModule,
    HttpModule,
    HttpClientModule,
    NguiMapModule.forRoot({apiUrl: ''})

  ],
  providers: [LoginService,AuthorisationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
