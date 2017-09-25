import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Budget, BudgetService, BudgetServiceCategory, BudgetCategoryItem } from '../../models/budget.model';
import { WAService } from "../../providers/wa.service"
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'budget',
  templateUrl: 'budgetStepTwo.html'
})
export class BudgetStepTwoPage {
  pageBudget: Budget;
  waService: WAService;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    this.waService = new WAService();
    this.pageBudget = new Budget();
    let oldBudget = navParams.get("budget");
    this.pageBudget = oldBudget.getFilteredBudget();

    console.log(this.pageBudget);
  }
}