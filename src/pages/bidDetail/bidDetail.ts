import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';
import { BudgetStepTwoPage } from '../budgetStepTwo/budgetStepTwo';
import { Budget } from '../../models/budget.model';

@Component({
  selector: 'page-bid',
  templateUrl: 'bidDetail.html'
})
export class BidDetail {
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

    this.waService = new WAService();
    this.userType = this.waService.GetFromDbWithKey("userType");
  }

  ionViewDidEnter() {
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

      let url = this.waService.GetServiceUrl() + '/api/budget/get_budgets_by_provider/' + id;
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
    if (this.bidType == "CLOSED") {
      this.auctions = this.auctionsBeforeFilter.filter(x => x.isAuctionActive === false);
    }
    else if (this.bidType == "OPENED")
      this.auctions = this.auctionsBeforeFilter.filter(x => x.isAuctionActive === true);
    else {
      this.auctions = this.auctionsBeforeFilter;
    }
  }
}