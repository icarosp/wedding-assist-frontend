import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BudgetStepTwoPage } from '../budgetStepTwo/budgetStepTwo'
import { Budget, BudgetService, BudgetServiceCategory, BudgetCategoryItem } from '../../models/budget.model';
import { WAService } from "../../providers/wa.service"

@Component({
  selector: 'page-bid',
  templateUrl: 'budget.html'
})
export class BudgetPage {
  pageBudget: Budget;
  waService: WAService;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController) {
    this.pageBudget = new Budget();
    this.waService = new WAService();

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
    item.type = "1";
    category.AddItems(item);

    let item2: BudgetCategoryItem;
    item2 = new BudgetCategoryItem();
    item2.name = "Italiana"
    item2.type = "2";
    item2.isSelected = true;
    category.AddItems(item2);

    let item3: BudgetCategoryItem;
    item3 = new BudgetCategoryItem();
    item3.name = "Arabe"
    item3.type = "3";
    category.AddItems(item3);

    let item4: BudgetCategoryItem;
    item4 = new BudgetCategoryItem();
    item4.name = "Japonesa"
    item4.type = "4";
    category.AddItems(item4);

    let item5: BudgetCategoryItem;
    item5 = new BudgetCategoryItem();
    item5.name = "Koreana"
    item5.type = "5";
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
  }

  addItems(category: BudgetServiceCategory, service: BudgetService) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione quais tipos de ' + category.categoryName + ' você deseja acresentar no orçamento');

    for (let item of category.items) {

      alert.addInput({
        type: 'checkbox',
        label: item.name,
        value: item.type,
        checked: item.isSelected
      });
    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Salvar',
      handler: data => {

        if (data.lengt > 0) {
          console.log("nao tem nada");
        }
        else {
          console.log("tem algo");
        }
        console.log(data);

        let hasSomethingOnThisCategory: boolean;
        hasSomethingOnThisCategory = false;

        for (let itemSelect of data) {
          for (let itemOnCategory of category.items) {
            if (itemSelect == itemOnCategory.type) {
              itemOnCategory.isSelected = true;
              hasSomethingOnThisCategory = true;
            }
          }
        }

        if (hasSomethingOnThisCategory) {
          //GET INDEX OF CATEGORY TO BE EXCLUDED
          let index: number = this.pageBudget.GetService(service.serviceName).GetCategory(category);
          //EXCLUDE CATEGORY WHICH HAS NO ITEM OR OLD ITEMS SELECTED
          this.pageBudget.GetService(service.serviceName).categories.splice(index, 1);
          //INCLUDED NEW CATEGORY WITH ALL USER SELECTED ITEMS CHECKED
          this.pageBudget.GetService(service.serviceName).AddCategory(category);
        } else {
          //GET INDEX OF CATEGORY TO BE EXCLUDED
          let index: number = this.pageBudget.GetService(service.serviceName).GetCategory(category);
          //EXCLUDE CATEGORY WHICH HAS NO ITEM OR OLD ITEMS SELECTED
          this.pageBudget.GetService(service.serviceName).categories[index].unselectAllItems();
        }
      }
    });

    alert.present();
  }

  nextStep(){
    //this.waService.SaveIntoDbWithKey("budget", this.pageBudget);
    this.navCtrl.push(BudgetStepTwoPage, {budget: this.pageBudget});
  }
}
