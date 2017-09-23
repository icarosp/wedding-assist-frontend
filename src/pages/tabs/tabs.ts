import { Component } from '@angular/core';
import { BidPage } from '../bid/bid';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions} from '@angular/http';
import { WAService } from "../../providers/wa.service"
import { AlertController, NavController } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BidPage;
  tab3Root = ProfilePage;
  waService: WAService;
  hasAnyBid: boolean;

  user: any;
  userName: string;


  constructor(
    public http: Http,
    public alertCtrl: AlertController) {
      this.waService = new WAService();

      this.hasAnyBid = false;


      let email = this.waService.GetFromDbWithKey("email");
      console.log(email);


      let url = this.waService.GetServiceUrl()+'/user/get_user_by_email'
      let body = JSON.stringify(email);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      
      this.http.post(url, body, options).subscribe(data => {
              console.log(data.json().data.providerName);
              this.userName = data.json().data.ProviderName;
      }, error => {
          this.doAlert("Erro",error.json().errors[0]);
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
