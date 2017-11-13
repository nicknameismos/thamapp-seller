import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { OrderService } from "@ngcommerce/core";

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  items;

  loading = this.loadingCtrl.create();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    // public loadingCtrl: LoadingProvider
  ) {
    this.loading.present();
    this.items = this.navParams.data;
    this.loading.dismiss();
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  showPrompt(order_id, item_id) {
    let prompt = this.alertCtrl.create({
      title: 'Ref. ID',
      message: "Please Enter Your Ref. ID",
      inputs: [
        {
          name: 'refid',
          placeholder: 'Ref. ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.loading.present();
            this.orderService.updateItemToSent(order_id, item_id).then((data) => {
              this.loading.dismissAll();
              this.navCtrl.pop();
            }, (err) => {
              this.loading.dismissAll();
              alert(JSON.parse(err._body).message);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updateStatus(item) {
    this.loading.present();
    if (item.status == "waiting") {
      this.orderService.updateItemToAccept(item.order_id, item.item_id).then((data) => {
        this.loading.dismiss();
        this.navCtrl.pop();
      }, (err) => {
        this.loading.dismissAll();
        alert(JSON.parse(err._body).message);
      });
    } else if (item.status == "accept") {
      this.loading.dismissAll();

      this.showPrompt(item.order_id, item.item_id);

    } else if (item.status == "sent") {
      this.orderService.updateItemToComplete(item.order_id, item.item_id).then((data) => {
        this.loading.dismissAll();
        this.navCtrl.pop();
      }, (err) => {
        this.loading.dismissAll();
        alert(JSON.parse(err._body).message);
      })
    } else if (item.status == "return") {

    }

  }

  updateStatusReject(item) {
    this.loading.present();
    this.orderService.updateItemToReject(item.order_id, item.item_id).then((data) => {
      this.loading.dismissAll();
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismissAll();
      alert(JSON.parse(err._body).message);
    })

  }

}
