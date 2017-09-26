import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { WAService } from "../../providers/wa.service"
import { Events, AlertController, NavController, LoadingController } from "ionic-angular";
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
  greeting: string;
  email: string;
  loader: any;
  private firstLoaded: boolean = false;

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController,
    public events: Events,
    public eventService: EventsService,
    public loadingController: LoadingController) {
    this.waService = new WAService()
    this.hasAnyBid = false;
    this.userName;

    this.email = this.waService.GetFromDbWithKey("email");

    //this.loadPageAndData();
    this.getGreeting();
  }

  ionViewDidEnter() {
    //console.log(this.firstLoaded);
    //if (!this.firstLoaded) {
    //this.auctions = null;
    //this.auctions = new Object();
    this.loadPageAndData();
    //}

    //this.firstLoaded = true;
  }


  loadPageAndData() {
    console.log("duplicou aqui");
    
    //LOADER
    //this.loader = this.loadingController.create({
      //content: "Carregando..."
   // });
    //this.loader.present();

    let url = this.waService.GetServiceUrl() + '/user/get_user_by_email'
    let body = JSON.stringify(this.email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).subscribe(data => {
      console.log(data.json().data);

      let userType = data.json().data.userType;

      if (userType == 0) {
        console.log("fiance");
        this.userName = data.json().data.name;
        this.waService.SaveIntoDbWithKey("id", data.json().data.fianceId);
        this.waService.SaveIntoDbWithKey("coupleId", data.json().data.coupleId);
        //this.loader.dismiss();
      }
      else {
        console.log("provider");
        this.userName = data.json().data.providerName;
        this.waService.SaveIntoDbWithKey("id", data.json().data.providerId);
        //this.loader.dismiss();
      }

      this.waService.SaveIntoDbWithKey("userType", userType);
    }, error => {
      this.doAlert("Erro", error.json().errors[0]);
      //this.loader.dismiss();
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

  getGreeting() {
    var myDate = new Date();
    if (myDate.getHours() < 12) {
      this.greeting = 'bom dia!';
    }
    else if (myDate.getHours() >= 12 && myDate.getHours() <= 17) { this.greeting = 'boa tarde!'; }
    else if (myDate.getHours() > 17 && myDate.getHours() <= 24) {
      this.greeting = 'boa noite!';
    }
  }

}
