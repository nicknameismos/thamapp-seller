import { CreateProductPage } from './../create-product/create-product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { CorService, ProductModel, ProductService } from "@ngcommerce/core";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  items = {} as ProductModel;
  loading = this.loadingCtrl.create();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    // public loadingCtrl: LoadingProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {

    this.loading.present();
    this.productService.getProductByID(this.navParams.data._id).then(data => {
      console.log(data);
      this.items = data;
      this.loading.dismiss();
    }).catch(e => {
      this.loading.dismiss();
      alert(e);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  alertdeleteProduct(item) {
    this.presentConfirm(item);
  }
  deleteProduct(item) {
    this.loading.present();
    this.productService.deleteProduct(item._id).then((data) => {
      this.navCtrl.pop();
      this.loading.dismiss();
    }, (err) => {
      alert(JSON.parse(err._body).message);
      this.loading.dismiss();
    });
  }
  presentConfirm(item) {
    const alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this Product?',
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
            this.deleteProduct(item);
          }
        }
      ]
    });
    alert.present();
  }
  updateProduct(e) {
    console.log(e);
    let productBind = {
      _id: e._id,
      name: e.name,
      detail: e.detail,
      price: e.price,
      currency: e.currency,
      promotionprice: e.promotionprice,
      percentofdiscount: e.percentofdiscount,
      shop: e.shop._id,
      shippings: [],
      categories: [],
      images: e.images
    };
    e.categories.forEach(element => {
      productBind.categories.push(element._id);
    });
    e.shippings.forEach(element => {
      productBind.shippings.push(element._id);
    });
    console.log(productBind);
    let productModal = this.modalCtrl.create(CreateProductPage, productBind);
    productModal.onDidDismiss(data => {
      if (data && data.name && data.name !== undefined) {
        this.loading.present();
        this.productService.updateProduct(data).then((resq) => {
          this.loading.dismiss();
          this.loading.present();
          this.productService.getProductByID(this.navParams.data._id).then(data => {
            console.log(data);
            this.items = data;
            this.loading.dismiss();
          }).catch(e => {
            this.loading.dismiss();
            alert(e);
          })
          // this.navCtrl.pop();
        }, (err) => {
          this.loading.dismiss();
          alert(JSON.parse(err._body).message);
        });
      }
    });
    productModal.present();
  }

}
