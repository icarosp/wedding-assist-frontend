import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html'
})
export class BidPage {
  waService: WAService;
  auctions: any;
  userType: any;
  controler: any;

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController) {

      this.startTimer();
      this.waService = new WAService();

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

  startTimer() {
    var presentTime =  3 + ":" + 0;
    //console.log(presentTime);
    var timeArray: any = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = this.checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    //if(m<0){alert('timer completed')}
    
    presentTime =
      m + ":" + s;
    setTimeout(this.startTimer, 1000);
  }

  checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }
}
