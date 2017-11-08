import { IonUploadImagesComponent } from './../components/ion-upload-image/ion-upload-image';
import { CreateProductPage } from './../pages/create-product/create-product';
import { NotificationPage } from './../pages/notification/notification';
import { ProductPage } from './../pages/product/product';
import { OrderPage } from './../pages/order/order';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { OneSignal } from '@ionic-native/onesignal';

import { EcommerceCoreModule, IonSegmentOrderComponent, IonListOrderComponent, IonOrdersComponent, IonDetailOrderComponent, IonFormProfileComponent, IonListProductComponent, IonDetailProductComponent, IonFormProductComponent, IonListShopComponent, IonFormShopComponent, IonUploadImageComponent, IonDetailShopComponent } from "@ngcommerce/core";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { CreateshopPage } from '../pages/createshop/createshop';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { ListshopPage } from '../pages/listshop/listshop';
import { ShopDetailPage } from '../pages/shop-detail/shop-detail';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    OrderPage,
    ProductPage,
    NotificationPage,
    CreateshopPage,
    IonFormShopComponent,
    IonUploadImagesComponent,
    IonUploadImageComponent,
    IonListProductComponent,
    ProductDetailPage,
    IonFormProductComponent,
    IonDetailProductComponent,
    CreateProductPage,
    IonFormProfileComponent,
    ListshopPage,
    IonListShopComponent,
    ShopDetailPage,
    IonDetailShopComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
    EcommerceCoreModule.forRoot('https://thamturakit.herokuapp.com/api/')
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    OrderPage,
    ProductPage,
    NotificationPage,
    CreateshopPage,
    IonFormShopComponent,
    IonUploadImagesComponent,
    IonUploadImageComponent,
    ProductDetailPage,
    CreateProductPage,
    ListshopPage,
    IonListShopComponent,
    ShopDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    ImagePicker,
    Base64,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
