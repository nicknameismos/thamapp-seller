import { EditProfilePage } from './../edit-profile/edit-profile';
import { Component } from '@angular/core';
import { NavController, App, NavParams, ModalController, MenuController, LoadingController, Events } from 'ionic-angular';
import { ShopModel } from '@ngcommerce/core';
import { LoginPage } from '../login/login';
import { ListshopPage } from '../listshop/listshop';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  user: any;
  shop = {} as ShopModel;
  constructor(
    public app: App, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalControl: ModalController, 
    public menuController: MenuController, 
    public loadingCtrl: LoadingController, 
    public events: Events
  ) {
    this.user = JSON.parse(window.localStorage.getItem('thamappbuyer'));    
  }
  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.workaroundSideMenu();
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.user = JSON.parse(window.localStorage.getItem('thamappbuyer'));
    this.shop = shop;
    console.log('ionViewDidLoad AccountPage');
    loading.dismiss();
  }

  logout(e) {
    window.localStorage.removeItem('thamappbuyer');
    window.localStorage.removeItem('shop');


    this.events.unsubscribe('notification:received');

    // this.app.getRootNav().popToRoot();
    setTimeout(() => {
      this.app.getRootNav().setRoot(LoginPage);
    }, 100);

  }
  createshop(e) {
    this.navCtrl.push(ListshopPage);
  }

  loginModal(e) {
    let loginModal = this.modalControl.create(LoginPage);
    loginModal.present();
  }

  editProfile(e) {
    this.navCtrl.push(EditProfilePage);
  }

  private workaroundSideMenu() {
    let leftMenu = this.menuController.get('left');
    if (leftMenu) {
      leftMenu.ionClose.subscribe(() => {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));
      });
    }
  }
}
