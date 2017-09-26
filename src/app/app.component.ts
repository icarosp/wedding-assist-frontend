import { Component, ViewChild } from "@angular/core";
import { Events, MenuController, NavController, Platform} from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AwsUtil } from "../providers/aws.service";
import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../pages/auth/login/login.component';
import { LogoutComponent } from "../pages/auth/logout/logout.component";
import { RegisterComponent } from "../pages/auth/register/register.component"
import { SearchPage } from "../pages/search/search"
import { ProfilePage } from "../pages/profile/profile"
import { BudgetPage } from "../pages/budget/budget"
import { BudgetStepTwoPage } from "../pages/budgetStepTwo/budgetStepTwo"
import { BidPage } from "../pages/bid/bid"


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
              public awsUtil: AwsUtil,
              public menu: MenuController
              ) 
    {


    platform.ready().then(() => {
      console.log("Initialized Aws Service");
      this.awsUtil.initAwsService();
  
      console.log("Set login component as root");
      this.rootPage = BudgetPage;
  
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the nav controller to have just this page
    // we wouldn't want the back button to show in this scenario
    this.rootPage = page;

    // close the menu when clicking a link from the menu
    this.menu.close();
}

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      console.log("evento subscribe login");  
      //this.enableMenu(true);
    });
  }

    enableMenu(loggedIn) {
console.log(loggedIn);

      this.menu.enable(loggedIn, 'loggedInMenu');
      this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}
