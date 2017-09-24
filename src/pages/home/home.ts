import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { WAService } from "../../providers/wa.service"
import {  Events, AlertController, NavController } from "ionic-angular";
import { EventsService } from "../../providers/events.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hasAnyBid: boolean;
  user: any;
  userName: string;
  waService: WAService;

  constructor(public navCtrl: NavController,
              public http: Http,
              public alertCtrl: AlertController,
              public events: Events,
              public eventService: EventsService) {
    this.waService = new WAService()
    this.hasAnyBid = false;
    this.userName;

    let email = this.waService.GetFromDbWithKey("email");
    console.log(email);

    let url = this.waService.GetServiceUrl() + '/user/get_user_by_email'
    let body = JSON.stringify(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).subscribe(data => {
      console.log(data.json().data);

      let userType = data.json().data.userType;

      if (userType == 0) {
        console.log("fiance");
        this.userName = data.json().data.name;
        this.waService.SaveIntoDbWithKey("id", data.json().data.fianceId);
      }
      else {
        console.log("provider");
        this.userName = data.json().data.providerName;
        this.waService.SaveIntoDbWithKey("id", data.json().data.providerId);
      }

      this.waService.SaveIntoDbWithKey("userType", userType);
    }, error => {
      this.doAlert("Erro", error.json().errors[0]);
    });
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
