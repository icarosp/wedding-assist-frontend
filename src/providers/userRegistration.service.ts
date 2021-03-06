import {CognitoCallback, CognitoUtil, RegistrationUser} from "./cognito.service";
import {Injectable} from "@angular/core";

declare let AWS: any;
declare let AWSCognito: any;

@Injectable()
export class UserRegistrationService {
    constructor(public cUtil: CognitoUtil) {
    }

    register(user: RegistrationUser, callback: CognitoCallback): void {
        
        //calls amazon
        console.log("user: " + user);

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: user.email
        };
        let dataName = {
            Name: 'name',
            Value: user.name
        };
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName));

        this.cUtil.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                console.log("registered user: " + result);
                callback.cognitoCallback(null, result);
            }
        });

        //calls our api

    }

    confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

        let userData = {
            Username: username,
            Pool: this.cUtil.getUserPool()
        };

        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        let userData = {
            Username: username,
            Pool: this.cUtil.getUserPool()
        };

        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

}