import { Component } from "@angular/core";

export class Budget {
    coupleId: number;
    startDate: any;
    duration: any;
    services: Array<BudgetService>;

    constructor() {
        this.services = new Array<BudgetService>();
    }

    AddService(service: BudgetService) {
        this.services.push(service)
    }

    GetService(name: string): BudgetService {
        return this.services.find(item => item.serviceName === name);
    }
}

export class BudgetService {
    categories: Array<BudgetServiceCategory>;
    serviceType: number;
    serviceName: string;
    isSelected: boolean;

    AddCategory(category: BudgetServiceCategory) {
        this.categories.push(category)
    }

    constructor() {
        this.categories = new Array<BudgetServiceCategory>();
    }

    selected() {
        console.log("ordem chegou aqui");
        this.isSelected = !this.isSelected;
    }

    selectedIcon() {
        if (this.isSelected)
            return "md-checkmark";
        return "md-add";
    }

    selectedText() {
        if (this.isSelected)
            return "Finalizar ";
        return "Acrescentar/Editar ";
    }

    GetCategory(object: any): number {
        return this.categories.indexOf(object);
    }
}

export class BudgetServiceCategory {
    items: Array<BudgetCategoryItem>;
    category: number;
    description: string;
    categoryName: string;
    categoryIcon: string;
    iSelected: boolean;

    AddItems(item: BudgetCategoryItem) {
        this.items.push(item)
    }

    constructor() {
        this.items = new Array<BudgetCategoryItem>()
    }

    GetRightIcon() {
        //if (this.items.length < 1)
        return "md-add";
        // return "md-create";
    }

    hasSelectedItems() {
        if (this.items.find(x => x.isSelected === true) != null)
            return true;
        return false;
    }

    unselectAllItems(){
        this.items.forEach(x=> x.isSelected = false);
    }

    selectSomeItems(items: Array<string>){
        //for(let item in items){
          //  for(let itemOnThisObject in this.items){
            //    if(item == itemOnThisObject.name)
                    
            //}
        //}
    }
}


export class BudgetCategoryItem {
    description: string;
    peopleQuantity: number;
    type: string;
    isSelected: boolean;
    name: string;

    constructor() {
        this.isSelected = false;
    }
}

