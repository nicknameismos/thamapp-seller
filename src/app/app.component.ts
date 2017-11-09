import { Component } from '@angular/core';
import { Platform, MenuController, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { UserModel, ShopService } from '@ngcommerce/core';
import * as firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  user = {} as UserModel;
  private shopList: Array<any> = [];
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public menuController: MenuController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public shopService: ShopService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.workaroundSideMenu();
    this.configFirebase();
  }

  initLoadStoreList() {
    this.user = JSON.parse(window.localStorage.getItem('thamappseller'));

    if (this.user) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.shopService.getShopListByUser().then(data => {
        this.shopList = data;
        loading.dismiss();
      }).catch(err => {
        window.localStorage.removeItem('thamappseller');
        window.localStorage.removeItem('shop');
        this.rootPage = LoginPage;
        loading.dismiss();

      });
    }
  }

  selectShop(item) {
    window.localStorage.setItem('shop', JSON.stringify(item));
    this.events.publish('notification:received'); // ขอใช้ Function เดียวกับ notification ครับ
  }

  private workaroundSideMenu() {
    setTimeout(() => {
      let leftMenu = this.menuController.get('left');

      if (leftMenu) {
        leftMenu.ionOpen.subscribe(() => {
          this.initLoadStoreList();
        });
      }
    }, 1000);
  }

  isShow(id) {
    let shopId = window.localStorage.getItem('shop') ? JSON.parse(window.localStorage.getItem('shop'))._id : null;
    return shopId === id;
  }

  configFirebase() {
    let config = {
      apiKey: "AIzaSyActRoM7SJW0h20HTM9GrkwJICC4moOzC8",
      authDomain: "green-vintage.firebaseapp.com",
      databaseURL: "https://green-vintage.firebaseio.com",
      projectId: "green-vintage",
      storageBucket: "green-vintage.appspot.com",
      messagingSenderId: "317596581774"
    };
    firebase.initializeApp(config);
  }
}
