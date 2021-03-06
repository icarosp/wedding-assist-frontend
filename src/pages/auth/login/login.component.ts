import { Component } from "@angular/core";
import { CognitoCallback, LoggedInCallback } from "../../../providers/cognito.service";
import { AlertController, NavController, NavParams, LoadingController } from "ionic-angular";
import { UserLoginService } from "../../../providers/userLogin.service";
import { EventsService } from "../../../providers/events.service";
import { TabsPage } from "../../tabs/tabs";
import { RegisterComponent } from "../register/register.component";
import { ForgotPasswordStep1Component } from "../forgotpassword/forgotPassword1.component";
import { WAService } from "../../../providers/wa.service"

@Component({
    templateUrl: 'login.html'
})
export class LoginComponent implements CognitoCallback, LoggedInCallback {
    email: string;
    password: string;
    waService: WAService;
    loader: any;

    constructor(public nav: NavController,
        public navParam: NavParams,
        public alertCtrl: AlertController,
        public userService: UserLoginService,
        public eventService: EventsService,
        public loadingController: LoadingController) {
        this.waService = new WAService();

        console.log("LoginComponent constructor");
        if (navParam != null && navParam.get("email") != null)
            this.email = navParam.get("email");

    }

    ionViewLoaded() {
        console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
        this.userService.isAuthenticated(this);
    }

    signMeIn() {
        //LOADER
        this.loader = this.loadingController.create({
            content: "Carregando..."
        });
        this.loader.present();



        console.log("in onLogin - IT IS WORKING!!!");
        if (this.email == null || this.password == null) {
            this.doAlert("Error", "All fields are required");
            return;
        }

        this.waService.SaveIntoDbWithKey('email', this.email);

        this.userService.authenticate(this.email, this.password, this);
    }

    cognitoCallback(message: string, result: any) {
        this.loader.dismiss();

        if (message != null) { //error
            this.doAlert("Error", message);
            console.log("result: " + message);
        } else { //success
            console.log("Redirect to ControlPanelComponent");
            this.nav.setRoot(TabsPage);
        }
    }

    isLoggedInCallback(message: string, isLoggedIn: boolean) {
        this.loader.dismiss();

        console.log("The user is logged in: " + isLoggedIn);
        if (isLoggedIn) {
            this.eventService.sendLoggedInEvent();

            this.nav.setRoot(TabsPage);
        }
    }

    navToRegister() {
        this.nav.push(RegisterComponent);
    }

    navToForgotPassword() {
        this.nav.push(ForgotPasswordStep1Component);
    }

    doAlert(title: string, message: string) {

        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

}