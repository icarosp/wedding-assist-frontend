import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';
import { TimerComponent } from '../../utils/timer';

@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html'
})
export class BidPage {
  waService: WAService;
  auctions: any;
  userType: any;
  controler: any;
  timer: TimerComponent;

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController) {

      this.waService = new WAService();
      
      setTimeout(() => {
        this.timer.startTimer();
      }, 1000)

      this.timer = new TimerComponent();
      this.timer.startTimer();

      this.userType = this.waService.GetFromDbWithKey("userType");

      if(this.userType == 0){

        let id = this.waService.GetFromDbWithKey("coupleId");
  
        let url = this.waService.GetServiceUrl() + '/budget/get_budgets_by_fiance/'+id;
        this.http.get(url).subscribe(data => {
          console.log(data.json().data);
          this.auctions = data.json().data;
          console.log(this.auctions);
        }, error => {
          this.doAlert("Erro", error.json().errors[0]);
        });
      }else{
        let id = this.waService.GetFromDbWithKey("coupleId");

        //WROOOOOONG!!

        let url = this.waService.GetServiceUrl() + '/user/provider/'+id;
        this.http.get(url).subscribe(data => {
          console.log(data.json().data);
          this.auctions = data.json().data;
        }, error => {
          this.doAlert("Erro", error.json().errors[0]);
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
