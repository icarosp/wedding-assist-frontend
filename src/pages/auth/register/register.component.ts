import {Component} from "@angular/core";
import {UserRegistrationService} from "../../../providers/userRegistration.service";
import {CognitoCallback, RegistrationUser} from "../../../providers/cognito.service";
import {AlertController, NavController} from "ionic-angular";
import {ConfirmRegistrationComponent} from "../confirmregistration/confirmRegistration.component";
import {ResendCodeComponent} from "../resendcode/resendCode.component";
import {LoginComponent} from "../login/login.component";
import { LoadingController } from 'ionic-angular';
import { Fiance } from "../../../models/fiance.model"
import { Provider } from "../../../models/provider.model"

/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
    templateUrl: 'register.html',
    providers: [UserRegistrationService]
})
export class RegisterComponent implements CognitoCallback {
    registrationUser: RegistrationUser;
    provider: Provider;
    fiance: Fiance;
    userType: string;


    loader: any;

    constructor(public nav: NavController,
                public userRegistration: UserRegistrationService,
                public alertCtrl: AlertController) {
        this.registrationUser = new RegistrationUser();
        this.fiance = new Fiance();
        this.provider = new Provider();

        this.userType = "fiance";

        /*this.loader = this.loader.create({
            spinner: 'hide',
            content: 'Por favor aguarde'
          });*/
    }

    ionViewLoaded() {

    }

    onRegister() {


    //fiance
    if(this.userType == "fiance")
        this.fiance.email = this.registrationUser.email;
    else
        this.provider.email = this.registrationUser.email;

    this.loader.present();
        //this.userRegistration.register(this.registrationUser, this);
    }

    /**
     * CAllback on the user clicking 'register'
     *
     * The user is taken to a confirmation page where he can enter the confirmation code to finish
     * registration
     *
     */
    cognitoCallback(awsMessage: string, result: any) {
        let msg: string;         
        
        if (awsMessage != null) { //error

            //translate errors to portuguese
            msg = "Problema ao efetuar cadastro.";

            this.doAlert("Erro", msg);
        } else { //success

            //FIANCE
            if(this.userType == "fiance"){


            //PROVIDER
            }else{


            }





            msg = "Cadastro efetuado com sucesso";

            this.doAlert("Cadastro", msg);

            //console.log("in callback...result: " + result);
            this.nav.push(ConfirmRegistrationComponent, {
                'username': result.user.username,
                'email': this.registrationUser.email
            });
        }
    }

    navToResendCode() {
        this.nav.push(ResendCodeComponent);
    }

    navToLogin() {
        this.nav.push(LoginComponent);
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