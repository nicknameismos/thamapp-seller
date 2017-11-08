import { Component } from '@angular/core';
import { LoadingController, Events, App, ModalController, AlertController, MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductListModel, ProductService, ShopModel } from "@ngcommerce/core";
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  product = {} as ProductListModel;
  loadData: Boolean = false;
  shop = {} as ShopModel;
  chkformimg = true;
  flag = true;

  loading = this.loadingCtrl.create();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public menuController: MenuController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    // public loadingCtrl: LoadingProvider,
    public loadingCtrl: LoadingController,
    public app: App,
    public events: Events
  ) {
    events.subscribe('notification:received', () => {
      this.shop = JSON.parse(window.localStorage.getItem('shop'));

      let currentPage = this.app.getActiveNav().getViews()[0].name;
      if (currentPage === 'ProductPage') {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));
        if (this.shop && this.flag) {
          this.flag = false;
          this.getProduct(this.shop);
        }
      }

    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ProductPage');

    this.shop = JSON.parse(window.localStorage.getItem('shop'));
    if (this.shop && this.shop._id) {
      this.getProduct(this.shop);
    }
  }

  getProduct(shop) {
    this.product = {} as ProductListModel;
    this.loading.present();
    this.productService.getProductListByShop(shop._id).then(data => {
      this.flag = true;
      this.loading.dismiss();
      console.log(data);
      this.product = data;
    }).catch(e => {
      this.flag = true;
      this.loading.dismiss();
      // alert(e);
      this.app.getRootNav().setRoot(LoginPage);
    })
  }

}
