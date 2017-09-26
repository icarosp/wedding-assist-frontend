import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';
import { BudgetStepTwoPage } from '../budgetStepTwo/budgetStepTwo';
import { Budget } from '../../models/budget.model';

@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html'
})
export class BidPage {
  waService: WAService;
  auctions: any;
  userType: any;
  controler: any;
  bidType: string;
  auctionsBeforeFilter: any;

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController) {

    this.bidType = "ALL";

    //this.StartTimer();
    this.waService = new WAService();

    this.userType = this.waService.GetFromDbWithKey("userType");

    if (this.userType == 0) {

      let id = this.waService.GetFromDbWithKey("coupleId");

      let url = this.waService.GetServiceUrl() + '/budget/get_budgets_by_fiance/' + id;
      this.http.get(url).subscribe(data => {
        console.log(data.json().data);
        this.auctionsBeforeFilter = this.auctions = data.json().data;
        console.log(this.auctions);
      }, error => {
        this.doAlert("Erro", error.json().errors[0]);
      });
    } else {
      let id = this.waService.GetFromDbWithKey("coupleId");

      //WROOOOOONG!!

      let url = this.waService.GetServiceUrl() + '/user/provider/' + id;
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

  showBudgetDetail(id: any) {
    let budget: Budget;

    let url = this.waService.GetServiceUrl() + '/budget/get_budget/' + id;
    this.http.get(url).subscribe(data => {
      budget = data.json().data;
      this.navCtrl.push(BudgetStepTwoPage, { budget: budget, editable: false })
    }, error => {
      this.doAlert("Erro", error.json().errors[0]);
    });
  }

  filterBid() {
    console.log("entrou aqui");
    console.log(this.bidType);


    if (this.bidType == "CLOSED") {
      this.auctions = this.auctionsBeforeFilter.filter(x => x.isAuctionActive === false);
    }
    else if (this.bidType == "OPENED")

      this.auctions = this.auctionsBeforeFilter.filter(x => x.isAuctionActive === true);
    else {
      this.auctions = this.auctionsBeforeFilter;
    }
  }

  /*private timer;
  private maxTime = 20;//get this from user input in the ionic time picker and convert it to seconds maybe.
  
  StartTimer() {
      this.timer = setTimeout(x => 
         {
           console.log(this.timer);
             if(this.maxTime <= 0)
             console.log("acabouu!");
             else
             this.maxTime -= 1;
             this.StartTimer();
  
         }, 1000);
        }*/
}