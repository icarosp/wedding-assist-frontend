import { Component } from '@angular/core';
import { BidPage } from '../bid/bid';
import { BudgetPage } from '../budget/budget';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BudgetPage;
  tab3Root = BidPage;
  tab4Root = SearchPage;
  tab5Root = ProfilePage;

  constructor(){}


}
