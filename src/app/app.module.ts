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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
