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
    categories: BudgetServiceCategory[];
    serviceType: number;
    serviceName: string;

    AddCategory(category: BudgetServiceCategory){
        this.categories.push(category)
    }
}

export class BudgetServiceCategory {
    items: BudgetCategoryItem[];
    category: number;
    description: string;

    AddItems(items: BudgetCategoryItem){
        this.items.push(items)
    }
}


export class BudgetCategoryItem {
    description: string;
    peopleQuantity: number;
    type: number;
}

