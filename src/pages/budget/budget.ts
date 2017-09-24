import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Budget,BudgetService,BudgetServiceCategory,BudgetCategoryItem } from '../../models/budget.model';

@Component({
  selector: 'page-bid',
  templateUrl: 'budget.html'
})
export class BudgetPage {
  services: BudgetService;
  pageBudget: Budget;
  pageBudgetServiceCategory: BudgetServiceCategory;

  constructor(public navCtrl: NavController) {
    this.pageBudget = new Budget();

    this.initializeServices();
  }

  initializeServices(){
    let service: BudgetService;
    service = new BudgetService();
    service.serviceType = 1;
    service.serviceName = "Buffet";

    let category: BudgetServiceCategory;
    category = new BudgetServiceCategory();
    category.categoryName = "Comidas";
    category.categoryIcon = "pizza";

    service.AddCategory(category);

    let category2: BudgetServiceCategory;
    category2 = new BudgetServiceCategory();
    category2.categoryName = "Bebidas";
    category2.categoryIcon = "pizza";

    service.AddCategory(category2);

    this.pageBudget.AddService(service);

    let service2: BudgetService;
    service2 = new BudgetService();
    service2.serviceType = 2;
    service2.serviceName = "Decoração";

    this.pageBudget.AddService(service2);


    console.log(this.pageBudget);
  }

}
