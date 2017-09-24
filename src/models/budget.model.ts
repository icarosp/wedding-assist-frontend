import {Component} from "@angular/core";

export class Budget {
    coupleId: number;
    startDate: any;
    duration: any;
    services: Array<BudgetService>;

    constructor() {
        this.services = new Array<BudgetService>();
    }

    AddService(service: BudgetService){
        this.services.push(service)
    }
}

export class BudgetService {
    categories: Array<BudgetServiceCategory>;
    serviceType: number;
    serviceName: string;
    isSelected: boolean;

    AddCategory(category: BudgetServiceCategory){
        this.categories.push(category)
    }

    constructor() {
        this.categories = new Array<BudgetServiceCategory>();
    }
}

export class BudgetServiceCategory {
    items: Array<BudgetCategoryItem>;
    category: number;
    description: string;
    categoryName: string;
    categoryIcon: string;

    AddItems(items: BudgetCategoryItem){
        this.items.push(items)
    }

    constructor() {
        this.items = new Array<BudgetCategoryItem>()
    }

    GetRightIcon(){
        if(this.items.length < 1)
          return "md-add";
        return "md-create";
    }
}


export class BudgetCategoryItem {
    description: string;
    peopleQuantity: number;
    type: number;
    selected: boolean;

    constructor() {
        this.selected = false;
    }
}

