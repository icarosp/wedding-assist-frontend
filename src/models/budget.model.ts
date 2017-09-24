import {Component} from "@angular/core";

export class Budget {
    coupleId: number;
    startDate: any;
    duration: any;
    services: BudgetService[];

    AddService(service: BudgetService){
        this.services.push(service)
    }
}

export class BudgetService {
    categories: BudgetServiceCategory[];
    serviceType: number;

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

