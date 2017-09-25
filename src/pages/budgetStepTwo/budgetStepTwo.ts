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

    /*oldBudget.services.forEach(service => {
      service.categories.forEach(category => {
        category.items.forEach(item => {
          if (item.isSelected) {

            let bufferCategory: BudgetServiceCategory;
            bufferCategory = new BudgetServiceCategory();
            bufferCategory.categoryName = category.categoryName;
            bufferCategory.AddItems(item);

            let bufferService: BudgetService
            bufferService = new BudgetService();
            bufferService.AddCategory(bufferCategory);
            bufferService.serviceName = service.serviceName;

            if (this.pageBudget.services.find(x => x.serviceName == service.serviceName) === undefined) {
              this.pageBudget.AddService(bufferService);
            } else {
              if (this.pageBudget.GetService(service.serviceName).categories.find(x => x.categoryName == category.categoryName) === undefined)
                this.pageBudget.GetService(service.serviceName).AddCategory(category);
              else
                this.pageBudget.GetService(service.serviceName).GetCategoryObject(category.categoryName).AddItems(item);
            }
          }
        });
      });
    });*/

    console.log(this.pageBudget);
  }
}