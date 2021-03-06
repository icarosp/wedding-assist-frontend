import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {CognitoUtil} from "../providers/cognito.service";
import {AwsUtil} from "../providers/aws.service";
import {UserLoginService} from "../providers/userLogin.service";
import { BidPage } from '../pages/bid/bid';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BidDetail } from '../pages/bidDetail/bidDetail';
import { EventsService } from "../providers/events.service";
import { LoginComponent } from "../pages/auth/login/login.component";
import { ForgotPasswordStep1Component } from "../pages/auth/forgotpassword/forgotPassword1.component";
import { ForgotPasswordStep2Component } from "../pages/auth/forgotpasswordstep2/forgotPassword2.component";
import { RegisterComponent } from "../pages/auth/register/register.component"
import { ConfirmRegistrationComponent } from "../pages/auth/confirmregistration/confirmRegistration.component"
import { HttpModule } from '@angular/http';
import { BudgetPage } from '../pages/budget/budget';
import { SearchPage } from '../pages/search/search';
import { BudgetStepTwoPage } from '../pages/budgetStepTwo/budgetStepTwo'
import { ResendCodeComponent } from "../pages/auth/resendcode/resendCode.component";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    BidPage,
    ProfilePage,
    HomePage,
    TabsPage,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    RegisterComponent,
    ConfirmRegistrationComponent,
    BudgetPage,
    SearchPage,
    BidDetail,
    BudgetStepTwoPage,
    ResendCodeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    BidPage,
    ProfilePage,
    HomePage,
    TabsPage,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    RegisterComponent,
    ConfirmRegistrationComponent,
    BudgetPage,
    SearchPage,
    BidDetail,
    BudgetStepTwoPage,
    ResendCodeComponent
  ],
  providers: [
    CognitoUtil,
    AwsUtil,
    UserLoginService,
    StatusBar,
    SplashScreen,
    EventsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
