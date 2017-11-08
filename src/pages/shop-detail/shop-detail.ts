import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { ShopModel, ShopService } from '@ngcommerce/core';
import { CreateshopPage } from '../createshop/createshop';

/**
 * Generated class for the ShopDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage {
  shop = {} as ShopModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopService: ShopService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopDetailPage');
    this.init();
  }
  init() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.shopService.getShopByID(this.navParams.data._id)
      .then(data => {
        this.shop = data;
        console.log(this.shop);
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
  }
  alertdeleteShop(item) {
    this.presentConfirm(item);
  }
  presentConfirm(item) {
    const alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this Shop?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('delete');
            this.deleteShop(item);
          }
        }
      ]
    });
    alert.present();
  }

  deleteShop(item) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.shopService.deleteShopByID(item._id).then((data) => {
      this.navCtrl.pop();
      loading.dismiss();
    }, (err) => {
      alert(JSON.parse(err._body).message);
      loading.dismiss();
    });
  }
  updateShop(e) {
    let shopModal = this.modalCtrl.create(CreateshopPage, e);
    shopModal.onDidDismiss(data => {
      if (data && data.name && data.name !== undefined) {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.shopService.updateShopByID(data).then((resq) => {
          // loading.dismiss();
          // this.loadingCtrl.onLoading();
          this.shopService.getShopByID(this.navParams.data._id).then(data => {
            console.log(data);
            loading.dismiss();
            this.shop = data;
            // this.loadingCtrl.dismiss();
          }).catch(e => {
            loading.dismiss();
            // this.loadingCtrl.dismiss();
            alert(e);
          })
          // this.navCtrl.pop();
        }, (err) => {
          loading.dismiss();
          alert(JSON.parse(err._body).message);
        });
      }
    });
    shopModal.present();
  }

}
