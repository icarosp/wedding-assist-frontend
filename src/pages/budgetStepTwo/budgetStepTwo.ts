import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Budget, BudgetService, BudgetServiceCategory, BudgetCategoryItem } from '../../models/budget.model';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'budget',
  templateUrl: 'budgetStepTwo.html'
})
export class BudgetStepTwoPage {
  pageBudget: Budget;
  waService: WAService;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public http: Http) {
    this.waService = new WAService();
    this.pageBudget = new Budget();
    let oldBudget = navParams.get("budget");
    this.pageBudget = oldBudget.getFilteredBudget();

    console.log(this.pageBudget);
  }

  sendBudget(){
    let url = this.waService.GetServiceUrl()+'/budget/save_budget/';
    let body = JSON.stringify(this.pageBudget);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(url, body, options).subscribe(data => {
            this.doAlert("Aviso","Dados salvos com sucesso!");
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