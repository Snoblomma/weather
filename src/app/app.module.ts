import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { PlacesPage } from '../pages/places/places';
import { WeatherPage } from '../pages/weather/weather';
import { AddPlacePage } from '../pages/add-place/add-place';
import { PlaceDetailsPage } from '../pages/place-details/place-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';
import { DataStorageProvider } from '../providers/data-storage/data-storage';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    PlacesPage,
    PlaceDetailsPage,
    WeatherPage,
    AddPlacePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    AutoCompleteModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    PlacesPage,
    PlaceDetailsPage,
    WeatherPage,
    AddPlacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    NativeStorage,
    DataStorageProvider
  ]
})
export class AppModule {}
