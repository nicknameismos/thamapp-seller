import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ShopListModel, ShopService } from '@ngcommerce/core';
import { CreateshopPage } from '../createshop/createshop';
import { ShopDetailPage } from '../shop-detail/shop-detail';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ListshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listshop',
  templateUrl: 'listshop.html',
})
export class ListshopPage {
  shop = {} as ShopListModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopService: ShopService,
    public modalControl: ModalController,
    public loadingCtrl: LoadingProvider
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ListshopPage');
    this.getShop();
  }
  getShop() {
    this.loadingCtrl.onLoading();
    this.shopService.getShopListByUser().then((data) => {
      this.shop.items = data;
      this.loadingCtrl.dismiss();
    }, (err) => {
      this.loadingCtrl.dismiss();
      console.log(err);
    });
  }
  createShopModal() {
    let shopModal = this.modalControl.create(CreateshopPage);
    shopModal.onDidDismiss(data => {
      if (data && data.name) {
        this.loadingCtrl.onLoading();
        this.shopService.createShop(data)
          .then((resp) => {
            this.loadingCtrl.dismiss();
            this.getShop();
          }, (err) => {
            this.loadingCtrl.dismiss();
            alert(JSON.parse(err._body).message);
          });
      }

    });
    shopModal.present();

  }
  selected(e) {
    this.navCtrl.push(ShopDetailPage, e);
  }
}
