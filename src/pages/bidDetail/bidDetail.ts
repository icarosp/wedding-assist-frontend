import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';
import { BudgetStepTwoPage } from '../budgetStepTwo/budgetStepTwo';
import { Budget } from '../../models/budget.model';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-bid',
  templateUrl: 'bidDetail.html'
})
export class BidDetail {
  waService: WAService;
  controler: any;
  bid: any;
  editable: boolean;
  loader: any;


  constructor(public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingController: LoadingController) {
    this.waService = new WAService();

    //online till load the full page
    this.bid = { services: [] };
  }

  ionViewDidEnter() {
    this.bid = this.navParams.get("bid");
    this.editable = !this.navParams.get("editable");

    console.log(this.bid);
  }

  sendOffer() {
    console.log(this.bid);

    //LOADER
    this.loader = this.loadingController.create({
      content: "Carregando..."
    });
    this.loader.present();

    this.bid["providerId"] = this.waService.GetFromDbWithKey("id");
    this.bid["auctionId"] = this.bid.auctionId;

    let url = this.waService.GetServiceUrl() + '/bid/save_bid';
    let body = JSON.stringify(this.bid);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).subscribe(data => {
      console.log(data);
      this.doAlert("Aviso", "Dados salvos com sucesso!");
      this.loader.dismiss();
      this.navCtrl.push(TabsPage);
    }, error => {
      this.loader.dismiss();
      this.doAlert("Erro", error.json().errors[0]);
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

  getServiceName(id: any) {
    console.log("entrou em detalhe nome service");
    console.log(id);


    switch (id) {
      case 2:
        return "Buffet";
      case 4:
        return "Decoração";
    }
  }

  chooseAsWinner() {
    //LOADER
    this.loader = this.loadingController.create({
      content: "Carregando..."
    });
    this.loader.present();


    let url = this.waService.GetServiceUrl() + '/bid/chooseBid/';
    let body = JSON.stringify({ id: this.bid.id });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).subscribe(data => {
      this.doAlert("Aviso", "Lance escolhido com sucesso!");
      this.loader.dismiss();
      this.navCtrl.push(TabsPage);
    }, error => {
      this.doAlert("Erro", error.json().errors[0]);
      this.loader.dismiss();
    });
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