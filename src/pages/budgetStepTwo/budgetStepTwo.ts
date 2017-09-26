import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Budget, BudgetService, BudgetServiceCategory, BudgetCategoryItem } from '../../models/budget.model';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';
import { TabsPage } from '../tabs/tabs'


@Component({
  selector: 'budget',
  templateUrl: 'budgetStepTwo.html'
})
export class BudgetStepTwoPage {
  pageBudget: Budget;
  waService: WAService;
  editable: boolean;
  loader: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public http: Http,
    public loadingController: LoadingController) {

    let date = new Date();
    date.setTime(date.getTime() + date.getTimezoneOffset() * -60 * 1000 + 60);
    date.setSeconds(date.getSeconds() + 180);

    //var n = today.toISOString();

    this.waService = new WAService();
    this.pageBudget = new Budget();
    this.pageBudget = navParams.get("budget");
    this.editable = !navParams.get("editable");
    //this.pageBudget = oldBudget.getFilteredBudget();
    this.pageBudget.duration = date.toISOString();
  }

  sendBudget(duration: any) {
    
    //LOADER
    this.loader = this.loadingController.create({
    content: "Carregando..."
     });
    this.loader.present();


    //adding auction duration
    //this.pageBudget.duration = '2017-08-09';
    this.pageBudget.coupleId = this.waService.GetFromDbWithKey("coupleId");
    console.log(this.pageBudget);


    let url = this.waService.GetServiceUrl() + '/budget/save_budget/';
    let body = JSON.stringify(this.pageBudget);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).subscribe(data => {
      this.doAlert("Aviso", "Dados salvos com sucesso!");
      this.loader.dismiss();
      this.navCtrl.push(TabsPage);
    }, error => {
      this.doAlert("Erro", error.json().errors[0]);
      this.loader.dismiss();
    });
  }

  backToBidPage() {
    this.navCtrl.pop();
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