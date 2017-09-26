import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';
import { BudgetStepTwoPage } from '../budgetStepTwo/budgetStepTwo';
import { Budget } from '../../models/budget.model';
import { BidDetail } from '../../pages/bidDetail/bidDetail';

@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html'
})
export class BidPage {
  waService: WAService;
  auctionsFiance: any;
  auctionsProvider: any;
  userType: any;
  controler: any;
  bidType: string;
  bidTypeProvider: string;
  auctionsBeforeFilterFiance: any;
  auctionsBeforeFilterProvider: any;

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController) {

    this.bidType = "ALL";
    this.bidTypeProvider = "ALL";

    this.waService = new WAService();
    this.userType = this.waService.GetFromDbWithKey("userType");
  }

  ionViewDidEnter() {
    //FIANCE
    if (this.userType == 0) {
      let id = this.waService.GetFromDbWithKey("coupleId");

      let url = this.waService.GetServiceUrl() + '/budget/get_budgets_by_fiance/' + id;
      this.http.get(url).subscribe(data => {
        console.log(data.json().data);
        this.auctionsBeforeFilterFiance = this.auctionsFiance = data.json().data;
        console.log(this.auctionsFiance);
      }, error => {
        this.doAlert("Erro", error.json().errors[0]);
      });
      //PROVIDER
    } else {
      let id = this.waService.GetFromDbWithKey("id");

      let url = this.waService.GetServiceUrl() + '/budget/get_budgets_by_provider/' + id;
      this.http.get(url).subscribe(data => {
        console.log(data.json().data);
        this.auctionsBeforeFilterProvider = this.auctionsProvider = data.json().data;
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

  makeOffer(id: any) {
    let budget: Budget;

    let url = this.waService.GetServiceUrl() + '/budget/get_budget/' + id;
    this.http.get(url).subscribe(data => {
      budget = data.json().data;
      console.log(budget);
      this.navCtrl.push(BidDetail, { bid: budget, editable: true });
    }, error => {
      this.doAlert("Erro", error.json().errors[0]);
    });
  }

  filterBidFiance() {
    if (this.bidType == "CLOSED") {
      this.auctionsFiance = this.auctionsBeforeFilterFiance.filter(x => x.isAuctionActive === false);
    }
    else if (this.bidType == "OPENED")
      this.auctionsFiance = this.auctionsBeforeFilterFiance.filter(x => x.isAuctionActive === true);
    else {
      this.auctionsFiance = this.auctionsBeforeFilterFiance;
    }
  }

  filterBidProvider() {
    if (this.bidTypeProvider == "CLOSED") {
      this.auctionsProvider = this.auctionsBeforeFilterProvider.filter(x => x.isAuctionActive === false);
    }
    else if (this.bidTypeProvider == "OPENED")
      this.auctionsProvider = this.auctionsBeforeFilterProvider.filter(x => x.isAuctionActive === true);
    else {
      this.auctionsProvider = this.auctionsBeforeFilterProvider;
    }
  }

  showBidDetail(id: number) {
    let budget: Budget;

    let url = this.waService.GetServiceUrl() + '/bid/get_bid/' + id;
    this.http.get(url).subscribe(data => {
      let bid = data.json().data;
      console.log(budget);
      this.navCtrl.push(BidDetail, { bid: bid, editable: false });
    }, error => {
      this.doAlert("Erro", error.json().errors[0]);
    });
  }

  getNumberOfBids(bids: any) {
    if (bids.length === 0)
      return "Nenhum lance"
    else if (bids.length === 1)
      return bids.length + " lance"
    else
      return bids.length + " lances"
  }

  getAuctionColor(active: boolean) {
    if (active)
      return "green";
    else
      return "red";
  }
}