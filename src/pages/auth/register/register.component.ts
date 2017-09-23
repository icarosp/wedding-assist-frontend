import { Component } from "@angular/core";
import { UserRegistrationService } from "../../../providers/userRegistration.service";
import { CognitoCallback, RegistrationUser } from "../../../providers/cognito.service";
import { AlertController, NavController } from "ionic-angular";
import { ConfirmRegistrationComponent } from "../confirmregistration/confirmRegistration.component";
import { ResendCodeComponent } from "../resendcode/resendCode.component";
import { LoginComponent } from "../login/login.component";
import { LoadingController } from 'ionic-angular';
import { Fiance } from "../../../models/fiance.model"
import { Provider } from "../../../models/provider.model"
import { WAService } from "../../../providers/wa.service"
import { Http, Headers, RequestOptions} from '@angular/http';

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
    waService: WAService;

    constructor(public nav: NavController,
        public userRegistration: UserRegistrationService,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        public http: Http) {
        this.registrationUser = new RegistrationUser();
        this.fiance = new Fiance();
        this.provider = new Provider();
        this.waService = new WAService();

        //set default value
        this.userType = "fiance";
    }

    ionViewLoaded() {

    }

    onRegister() {


        //fiance
        if (this.userType == "fiance")
            this.fiance.email = this.registrationUser.email;
        else
            this.provider.email = this.registrationUser.email;

        this.loader = this.loadingController.create({
            content: "Salvando..."
        });
        this.loader.present();

        this.cognitoCallback(null,null);

        //CALL REGISTRATION SERVICES
        //this.userRegistration.register(this.registrationUser, this);
    }


    waCallback(waMessage: string, result: any){

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
        this.loader.dismiss();

        if (awsMessage != null) { //error

            //translate errors to portuguese
            msg = "Problema ao efetuar cadastro.";

            this.doAlert("Erro", msg);
        } else { //success

            //FIANCE
            if (this.userType == "fiance") {
                
                let url = 'http://localhost:56934/api/user/save_fiance'
                let body = JSON.stringify(this.fiance);
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                
                return this.http.post(url, body, options).subscribe(data => {
                        this.doAlert("Aviso","Cadastro efetuado com sucesso!");
                }, error => {
                    this.doAlert("Erro",error.json().errors[0]);
                });
                
                //this.waService.RegisterFiance(this.fiance);
                //PROVIDER
            } else {


            }/*

            



            msg = "Cadastro efetuado com sucesso";

            this.doAlert("Cadastro", msg);

            //console.log("in callback...result: " + result);
            this.nav.push(ConfirmRegistrationComponent, {
                'username': result.user.username,
                'email': this.registrationUser.email
            });*/
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