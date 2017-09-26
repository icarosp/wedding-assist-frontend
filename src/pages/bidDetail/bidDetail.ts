import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
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
  controler: any;
  bid: any;
  editable: boolean;


  constructor(public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams,
    public alertCtrl: AlertController) {

    this.bid = navParams.get("bid");
    this.editable = !navParams.get("editable");

    console.log(this.bid);
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

  getServiceName(id: any) {
    switch (id) {
      case 2:
        return "Buffet";
      case 4:
        return "Decoração";
    }
  }

  getCategoryName(id: any) {
    switch (id) {
      case 2:
        return "Comida";
      case 1:
        return "Bebida";
      case 3:
        return "Cadeira";
      case 4:
        return "Mesa";
    }
  }

  getItemName(id: any) {
    switch (id) {
      case 3:
        return "Cerveja";
      case 4:
        return "Suco";
      case 5:
        return "Refrigerante";
      case 6:
        return "Brasileiro";
      case 7:
        return "Italiano";
      case 8:
        return "Arabe";
      case 9:
        return "Japonês";
      case 10:
        return "Koreano";
      case 11:
        return "Cadeira de Cerimônia";
      case 12:
        return "Cadeira de Evento";
    }
  }
}