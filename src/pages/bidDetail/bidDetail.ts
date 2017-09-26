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
  userType: any;
  controler: any;

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
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