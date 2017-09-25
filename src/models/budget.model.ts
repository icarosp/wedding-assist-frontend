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

    getFilteredBudget() : Budget{
        let filteredBudget: Budget;
        filteredBudget = new Budget();

        this.services.forEach(service => {
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

                        if (filteredBudget.services.find(x => x.serviceName == service.serviceName) === undefined) {
                            filteredBudget.AddService(bufferService);
                        } else {
                            if (filteredBudget.GetService(service.serviceName).categories.find(x => x.categoryName == category.categoryName) === undefined)
                                filteredBudget.GetService(service.serviceName).AddCategory(category);
                            else
                                filteredBudget.GetService(service.serviceName).GetCategoryObject(category.categoryName).AddItems(item);
                        }
                    }
                });
            });
        });

        return filteredBudget
    }
}

export class BudgetService {
    categories: Array<BudgetServiceCategory>;
    serviceType: number;
    serviceName: string;
    isSelected: boolean;
    hasSelectedItens: boolean;

    AddCategory(category: BudgetServiceCategory) {
        this.categories.push(category)
    }

    constructor() {
        this.categories = new Array<BudgetServiceCategory>();
    }

    selected() {
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
        return "Adicionar/Editar ";
    }

    GetCategory(object: any): number {
        return this.categories.indexOf(object);
    }

    GetCategoryObject(name: string): BudgetServiceCategory {
        return this.categories.find(category => category.categoryName === name);
    }

    hasSelectedItems() {
        this.categories.forEach((x) => { console.log(x.isSelected); if (x.isSelected) return true; });
    }
}

export class BudgetServiceCategory {
    items: Array<BudgetCategoryItem>;
    category: number;
    description: string;
    categoryName: string;
    categoryIcon: string;
    isSelected: boolean;

    AddItems(item: BudgetCategoryItem) {
        this.items.push(item)
    }

    constructor() {
        this.items = new Array<BudgetCategoryItem>()
        this.isSelected = false;

        this.items.forEach((x) => { console.log(x.isSelected); if (x.isSelected) this.isSelected = true; });
    }

    GetRightIcon() {
        //if (this.items.length < 1)
        return "md-add";
        // return "md-create";
    }

    hasSelectedItems() {
        return true;//this.items.forEach((x) => { console.log(x.isSelected); if(x.isSelected) return true; });
    }

    unselectAllItems() {
        this.items.forEach(x => x.isSelected = false);
    }

    GetSelectedItems(): BudgetCategoryItem {
        return this.items.find(x => x.isSelected === true);
    }

    selectSomeItems(items: Array<string>) {
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

