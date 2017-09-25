import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public http: Http) {

      let date = new Date();
      date.setTime( date.getTime() + date.getTimezoneOffset()*-60*1000+60 ); 

    //var n = today.toISOString();

    this.waService = new WAService();
    this.pageBudget = new Budget();
    this.pageBudget = navParams.get("budget");
    this.editable = !navParams.get("editable");
    //this.pageBudget = oldBudget.getFilteredBudget();
    this.pageBudget.duration = date.toISOString();




    console.log(this.pageBudget);
  }

  sendBudget(duration: any) {
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
      this.navCtrl.push(TabsPage);
    }, error => {
      this.doAlert("Erro", error.json().errors[0]);
    });
  }

  backToBidPage(){
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

  getServiceName(id: any){
    console.log(id);

    switch (id) {
      case 2:
        return "Buffet";
      case 4:
        return "Decoração";
    }
  }
}