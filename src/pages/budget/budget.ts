import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BudgetStepTwoPage } from '../budgetStepTwo/budgetStepTwo'
import { Budget, BudgetService, BudgetServiceCategory, BudgetCategoryItem } from '../../models/budget.model';
import { WAService } from "../../providers/wa.service"
import { HomePage } from "../../pages/home/home"

@Component({
  selector: 'page-bid',
  templateUrl: 'budget.html'
})
export class BudgetPage {
  pageBudget: Budget;
  waService: WAService;
  private firstLoaded: boolean = false;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController) {
    this.pageBudget = new Budget();
    this.waService = new WAService();

    this.initializeServices();
  }

  ionViewDidEnter() {

    if(this.waService.GetFromDbWithKey("userType")){
      this.doAlert("Erro", "Não é permitido fornecedores solicitarem orçamentos.");
      this.navCtrl.push(HomePage);      
    }
    


    if (!this.firstLoaded) {
      this.pageBudget = null;
      this.pageBudget = new Budget();
      this.initializeServices();
    }

    this.firstLoaded = true;
  }

  initializeServices() {
    //SERVICE BUFFET
    let service: BudgetService;
    service = new BudgetService();
    service.serviceType = 2;
    service.serviceName = "Buffet";

    //CATEGORY FOOD
    let category: BudgetServiceCategory;
    category = new BudgetServiceCategory();
    category.categoryName = "Comidas";
    category.categoryIcon = "pizza";
    category.category = "2";

    console.log(category);

    //ITEM BRAZILIAN FOOD
    let item: BudgetCategoryItem;
    item = new BudgetCategoryItem();
    item.name = "Brasileira"
    item.type = "6";

    category.AddItems(item);

    //ITEM ITALIAN FOOD
    let item2: BudgetCategoryItem;
    item2 = new BudgetCategoryItem();
    item2.name = "Italiana"
    item2.type = "7";
    category.AddItems(item2);

    //ITEM ARABIAN FOOD
    let item3: BudgetCategoryItem;
    item3 = new BudgetCategoryItem();
    item3.name = "Arabe"
    item3.type = "8";
    category.AddItems(item3);

    //ITEM JAPANESE FOOD
    let item4: BudgetCategoryItem;
    item4 = new BudgetCategoryItem();
    item4.name = "Japonesa"
    item4.type = "9";
    category.AddItems(item4);

    //ITEM KOREAN FOOD
    let item5: BudgetCategoryItem;
    item5 = new BudgetCategoryItem();
    item5.name = "Koreana"
    item5.type = "10";
    category.AddItems(item5);

    service.AddCategory(category);

    //CATEGORY DRINKS
    let category2: BudgetServiceCategory;
    category2 = new BudgetServiceCategory();
    category2.categoryName = "Bebidas";
    category2.categoryIcon = "beer";
    category2.category = "1";

    //ITEM BEER
    let item8: BudgetCategoryItem;
    item8 = new BudgetCategoryItem();
    item8.name = "Cerveja"
    item8.type = "3";
    category2.AddItems(item8);

    //ITEM JUICE
    let item9: BudgetCategoryItem;
    item9 = new BudgetCategoryItem();
    item9.name = "Suco"
    item9.type = "4";
    category2.AddItems(item9);

    //ITEM BEVERAGE
    let item10: BudgetCategoryItem;
    item10 = new BudgetCategoryItem();
    item10.name = "Refrigerante"
    item10.type = "5";
    category2.AddItems(item10);

    service.AddCategory(category2);

    this.pageBudget.AddService(service);

    //SERVICE DECORATION
    let service2: BudgetService;
    service2 = new BudgetService();
    service2.serviceType = 4;
    service2.serviceName = "Decoração";

    //CATEGORY CHAIR
    let category3: BudgetServiceCategory;
    category3 = new BudgetServiceCategory();
    category3.categoryName = "Cadeira";
    category3.categoryIcon = "grid";
    category3.category = "3";

    //ITEM CERIMONY CHAIR
    let item6: BudgetCategoryItem;
    item6 = new BudgetCategoryItem();
    item6.name = "Cadeira de Cerimônia"
    item6.type = "11";
    category3.AddItems(item6);

    //ITEM EVENT CHAIR
    let item7: BudgetCategoryItem;
    item7 = new BudgetCategoryItem();
    item7.name = "Cadeira de Evento"
    item7.type = "12";
    category3.AddItems(item7);

    service2.AddCategory(category3);

    //CATEGORY TABLE
    let category4: BudgetServiceCategory;
    category4 = new BudgetServiceCategory();
    category4.categoryName = "Mesa";
    category4.categoryIcon = "ios-barcode";
    category4.category = "4";

    //ITEM PARTY TABLE
    let item11: BudgetCategoryItem;
    item11 = new BudgetCategoryItem();
    item11.name = "Mesa de Festa"
    item11.type = "13";
    category4.AddItems(item11);

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

        console.log(data);

        let hasSomethingOnThisCategory: boolean;
        hasSomethingOnThisCategory = false;

        for (let itemSelect of data) {
          for (let itemOnCategory of category.items) {
            if (itemSelect == itemOnCategory.type) {
              console.log("tem item "+itemOnCategory.type);
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

        console.log(this.pageBudget);
      }
    });

    alert.present();
  }

  nextStep() {

    if (this.pageBudget.getFilteredBudget().services.length < 1)
      this.doAlert("Erro", "Selecione ao menos um item para prosseguir com o orçamento!");
    else
      this.navCtrl.push(BudgetStepTwoPage, { budget: this.pageBudget.getFilteredBudget(), editable: true });
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
