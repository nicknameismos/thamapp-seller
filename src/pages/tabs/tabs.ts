import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ProductPage } from './../product/product';
import { OrderPage } from './../order/order';
import { NotificationPage } from './../notification/notification';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OrderPage;
  tab3Root = ProductPage;
  tab4Root = NotificationPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
