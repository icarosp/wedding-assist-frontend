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

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController) {
    this.waService = new WAService()
    this.type = this.waService.GetFromDbWithKey("userType");

    if (this.type == "1") {
      let url = this.waService.GetServiceUrl() + '/user/fiances'
      this.http.get(url).subscribe(data => {
        console.log(data.json().fiances);
        this.itens = data.json().fiances;
      }, error => {
        this.doAlert("Erro", error.json().errors[0]);
      });
    }

  }

  callTo(phone: string){
    window.location.href='tel:+55'+phone;
  }

  emailTo(email: string){
    window.open('mailto:'+email);
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
