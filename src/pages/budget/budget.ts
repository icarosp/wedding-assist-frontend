import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Budget, BudgetService, BudgetServiceCategory, BudgetCategoryItem } from '../../models/budget.model';

@Component({
  selector: 'page-bid',
  templateUrl: 'budget.html'
})
export class BudgetPage {
  services: BudgetService;
  pageBudget: Budget;
  pageBudgetServiceCategory: BudgetServiceCategory;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController) {
    this.pageBudget = new Budget();

    this.initializeServices();
  }

  initializeServices() {
    let service: BudgetService;
    service = new BudgetService();
    service.serviceType = 1;
    service.serviceName = "Buffet";

    let category: BudgetServiceCategory;
    category = new BudgetServiceCategory();
    category.categoryName = "Comidas";
    category.categoryIcon = "pizza";

    let item: BudgetCategoryItem;
    item = new BudgetCategoryItem();
    item.name = "Brasileira"
    item.type = 1;
    category.AddItems(item);

    let item2: BudgetCategoryItem;
    item2 = new BudgetCategoryItem();
    item2.name = "Italiana"
    item2.type = 2;
    category.AddItems(item2);

    let item3: BudgetCategoryItem;
    item3 = new BudgetCategoryItem();
    item3.name = "Arabe"
    item3.type = 3;
    category.AddItems(item3);

    let item4: BudgetCategoryItem;
    item4 = new BudgetCategoryItem();
    item4.name = "Japonesa"
    item4.type = 4;
    category.AddItems(item4);

    let item5: BudgetCategoryItem;
    item5 = new BudgetCategoryItem();
    item5.name = "Koreana"
    item5.type = 5;
    category.AddItems(item5);

    console.log(category);


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

  addItems(category: BudgetServiceCategory) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione quais tipos de ' + category.categoryName + ' você deseja acresentar no orçamento');

    for (let item of category.items) {
      console.log(item);

      alert.addInput({
        type: 'checkbox',
        label: item.name,
        value: item.name
      });
    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Salvar',
      handler: data => {
        console.log('Checkbox data:', data);
        //this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

}
