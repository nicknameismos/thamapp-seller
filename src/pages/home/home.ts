import { Component } from '@angular/core';
import { NavController, App, Events, LoadingController } from 'ionic-angular';
import { HomeService, ShopModel } from '@ngcommerce/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homeData: any = {
    items: {
      day: { amount: 0 },
      month: { amount: 0 },
      year: { amount: 0 },
      categories: [{
        cate: ''
      }]
    },
    report: []
  };
  shop = {} as ShopModel;
  flag = true;
  constructor(
    public navCtrl: NavController,
    public homeService: HomeService,
    public loadingCtrl: LoadingController,
    public app: App,
    public events: Events
  ) {
    this.events.subscribe('notification:received', () => {
      // let shop = JSON.parse(window.localStorage.getItem("shop"));
      // this.shop = shop;
      // if (this.shop) {
      //   this.getOrder(this.shop);
      // }

      let currentPage = this.app.getActiveNav().getViews()[0].name;
      if (currentPage === 'HomePage') {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));
        if (this.shop && this.flag) {
          this.flag = false;
          // this.loadingCtrl.onLoading();
          this.getOrder(this.shop);
          // this.loadingCtrl.dismiss();
        }
        // this.events.unsubscribe('notification:received');
        // this.subnoti();
      }

    });
  }

  getOrder(shop) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.homeService.getHomeSeller(shop._id).then(data => {

      this.homeData = data;
      this.flag = true;
      loading.dismiss();

    }, err => {
      this.flag = true;
      loading.dismiss();
      // alert(JSON.parse(err._body).message);
      // this.app.getRootNav().setRoot(LoginPage);
    })
  }

}
