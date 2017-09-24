import { Component } from '@angular/core';
import { AlertController, NavController } from "ionic-angular";
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-bid',
  templateUrl: 'search.html'
})
export class SearchPage {
  waService: WAService;
  itens: any;
  type: string;
  fianceitems: Array<string>;
  provideritems: Array<string>;
  fiances: any;
  providers: any;

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController) {
    this.waService = new WAService()
    this.type = this.waService.GetFromDbWithKey("userType");

    if (this.type == "1") {
      console.log("searching fiances");
      let url = this.waService.GetServiceUrl() + '/user/fiances'
      this.http.get(url).subscribe(data => {
        //console.log(data.json().fiances);
        this.fianceitems = this.fiances = data.json().data.fiances;
        console.log(this.fianceitems);
      }, error => {
        this.doAlert("Erro", error.json().errors[0]);
      });
    } else {
      console.log("searching providers");
      let url = this.waService.GetServiceUrl() + '/user/providers'
      this.http.get(url).subscribe(data => {
        //console.log(data.json().fiances);
        this.provideritems = this.providers = data.json().data.providers;
        console.log(this.providers);
      }, error => {
        this.doAlert("Erro", error.json().errors[0]);
      });
    }

  }
  //ion-android-notifications

  onCancel(ev: any) {
    this.fianceitems = this.fiances;
  }

  callTo(phone: string) {
    window.location.href = 'tel:+55' + phone;
  }

  emailTo(email: string) {
    window.open('mailto:' + email);
  }

  filterFiances(ev: any) {
    console.log(ev);

    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.fianceitems = this.fianceitems.filter(function (item) {
        return item['name'].toLowerCase().includes(val.toLowerCase());
      });
    }
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
