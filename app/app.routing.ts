import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import { AccountInfoComponent } from './accountInfo.component';
import { AppComponent } from './app.component';
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
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },  
  { path: 'accountInfo', component: AccountInfoComponent, canActivate: [AuthGuard, VerifyGuard]  },    
  { path: 'forgotPassword', component: ForgotPasswordComponent },    
  { path: 'forgotPasswordError', component: ForgotPasswordErrorComponent },      
  { path: 'forgotPasswordSuccess', component: ForgotPasswordSuccessComponent },       
  { path: 'home', component: HomeComponent },  
  { path: 'league', component: LeagueComponent, canActivate: [AuthGuard, VerifyGuard] }, 
  { path: 'login', component: LoginComponent },  
  { path: 'logout', component: LogoutComponent },    
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [AuthGuard, VerifyGuard] },      
  { path: 'signup', component: SignupComponent },        
  { path: 'verifyEmail', component: VerifyEmailComponent },          
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
