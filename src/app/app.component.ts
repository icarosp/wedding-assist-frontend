import { Component, ViewChild } from "@angular/core";
import { Events, MenuController, NavController, Platform} from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AwsUtil } from "../providers/aws.service";
import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../pages/auth/login/login.component';
import { LogoutComponent } from "../pages/auth/logout/logout.component";
import { RegisterComponent } from "../pages/auth/register/register.component"

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(NavController) navCtrl;
  public loginPage = LoginComponent;
  public homePage = TabsPage;
  public logoutPage = LogoutComponent;
  public splash = new SplashScreen();
  public rootPage: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public events: Events,
              public awsUtil: AwsUtil
              ) 
    {


    platform.ready().then(() => {
      console.log("Initialized Aws Service");
      this.awsUtil.initAwsService();
  
      console.log("Set login component as root");
      this.rootPage = RegisterComponent;
  
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      console.log("evento subscribe login");  
      //this.enableMenu(true);
    });


    this.events.subscribe('user:logout', () => {
      console.log("evento subscribe logout");    
      //this.enableMenu(false);
    });
}
}
