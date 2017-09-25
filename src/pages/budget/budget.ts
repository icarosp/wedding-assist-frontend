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
    //SERVICE BUFFET
    let service: BudgetService;
    service = new BudgetService();
    service.serviceType = 1;
    service.serviceName = "Buffet";

    //CATEGORY FOOD
    let category: BudgetServiceCategory;
    category = new BudgetServiceCategory();
    category.categoryName = "Comidas";
    category.categoryIcon = "pizza";

    //ITEM BRAZILIAN FOOD
    let item: BudgetCategoryItem;
    item = new BudgetCategoryItem();
    item.name = "Brasileira"
    item.type = "1";
    category.AddItems(item);

    //ITEM ITALIAN FOOD
    let item2: BudgetCategoryItem;
    item2 = new BudgetCategoryItem();
    item2.name = "Italiana"
    item2.type = "2";
    item2.isSelected = true;
    category.AddItems(item2);

    //ITEM ARABIAN FOOD
    let item3: BudgetCategoryItem;
    item3 = new BudgetCategoryItem();
    item3.name = "Arabe"
    item3.type = "3";
    category.AddItems(item3);

    //ITEM JAPANESE FOOD
    let item4: BudgetCategoryItem;
    item4 = new BudgetCategoryItem();
    item4.name = "Japonesa"
    item4.type = "4";
    category.AddItems(item4);

    //ITEM KOREAN FOOD
    let item5: BudgetCategoryItem;
    item5 = new BudgetCategoryItem();
    item5.name = "Koreana"
    item5.type = "5";
    category.AddItems(item5);

    service.AddCategory(category);

    //CATEGORY DRINKS
    let category2: BudgetServiceCategory;
    category2 = new BudgetServiceCategory();
    category2.categoryName = "Bebidas";
    category2.categoryIcon = "pizza";

    //ITEM BEER
    let item8: BudgetCategoryItem;
    item8 = new BudgetCategoryItem();
    item8.name = "Cerveja"
    item8.type = "8";
    category2.AddItems(item8);

    //ITEM JUICE
    let item9: BudgetCategoryItem;
    item9 = new BudgetCategoryItem();
    item9.name = "Suco"
    item9.type = "9";
    category2.AddItems(item4);

    //ITEM BEVERAGE
    let item10: BudgetCategoryItem;
    item10 = new BudgetCategoryItem();
    item10.name = "Refrigerante"
    item10.type = "10";
    category2.AddItems(item10);

    service.AddCategory(category2);

    this.pageBudget.AddService(service);

    //SERVICE DECORATION
    let service2: BudgetService;
    service2 = new BudgetService();
    service2.serviceType = 2;
    service2.serviceName = "Decoração";

    //CATEGORY CHAIR
    let category3: BudgetServiceCategory;
    category3 = new BudgetServiceCategory();
    category3.categoryName = "Cadeira";
    category3.categoryIcon = "pizza";

    //ITEM CERIMONY CHAIR
    let item6: BudgetCategoryItem;
    item6 = new BudgetCategoryItem();
    item6.name = "Cadeira de Cerimonia"
    item6.type = "6";
    category3.AddItems(item6);

    //ITEM EVENT CHAIR
    let item7: BudgetCategoryItem;
    item7 = new BudgetCategoryItem();
    item7.name = "Cadeira de Evento"
    item7.type = "7";
    category3.AddItems(item7);

    service2.AddCategory(category3);

    //CATEGORY TABLE
    let category4: BudgetServiceCategory;
    category4 = new BudgetServiceCategory();
    category4.categoryName = "Mesa";
    category4.categoryIcon = "pizza";

    service2.AddCategory(category4);

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

  nextStep() {
    //this.waService.SaveIntoDbWithKey("budget", this.pageBudget);
    this.navCtrl.push(BudgetStepTwoPage, { budget: this.pageBudget });
  }
}
