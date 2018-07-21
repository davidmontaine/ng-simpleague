import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BrowserModule} from '@angular/platform-browser';

import { AboutComponent } from './about.component';
import { AccountInfoComponent } from './accountInfo.component';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ForgotPasswordComponent } from './forgotPassword.component';
import { ForgotPasswordErrorComponent } from './forgotPasswordError.component';
import { ForgotPasswordSuccessComponent } from './forgotPasswordSuccess.component';
import { HomeComponent } from './home.component';
import { LeagueComponent } from './league.component';
import { ResetPasswordComponent } from './resetPassword.component';
import { SignupComponent } from './signup.component';
import { VerifyEmailComponent } from './verifyEmail.component';
import { AuthGuard } from './_guards/auth.guard';
import { VerifyGuard } from './_guards/verify.guard';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { AuthenticationService } from './_services/authentication.service';
import { GlobalService } from './_services/global.service';
import { LeagueService } from './_services/league.service';
import { UserService } from './_services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AboutComponent,   
    AccountInfoComponent,
    AppComponent,   
    ForgotPasswordComponent,        
    ForgotPasswordErrorComponent,                
    ForgotPasswordSuccessComponent,               
    HomeComponent,    
    LeagueComponent,   
    LoginComponent,    
    LogoutComponent,           
    ResetPasswordComponent,    
    SignupComponent,
    VerifyEmailComponent    
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    BaseRequestOptions,
    GlobalService,
    LeagueService,
    UserService,
    VerifyGuard

    // providers used to create fake backend
    //fakeBackendProvider,
    //MockBackend
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
