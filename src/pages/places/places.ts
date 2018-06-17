import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { PlaceDetailsPage } from '../place-details/place-details';
import { AddPlacePage } from '../add-place/add-place';
import { DataStorageProvider } from '../../providers/data-storage/data-storage';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  public images: Array<any> = [];
  public placesDecription: Array<{ name: string, placeId: string, image: string, resource_uri: string }>;
  public placesResult: Array<{ place: any, image: string, distance: any, resource_uri: string, visited: boolean, name: string }> = [];
  public placesResultRestore: any;
  public collapsed: boolean = true;
  public loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public apiProvider: ApiProvider,
    public dataStorageProvider: DataStorageProvider,
    public loadingCtrl: LoadingController) {
    this.placesResult = [];
    this.presentLoadingDefault();
    if (this.placesResult == []) {
      this.initialize();
    }
    this.loading.dismiss();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  ionViewWillEnter() {
    console.log("called");
    this.initialize();
  }

  async initialize() {
    this.collapsed = true;
    this.placesResult = [];
    this.dataStorageProvider.places = [];

    await this.apiProvider.getPlacesListLocalBackend().then(
      res => {
        this.placesDecription = res['objects'];
        console.log(this.placesDecription);
      }
    );

    this.dataStorageProvider.places = this.placesDecription;
    this.dataStorageProvider.savePlaces();

    if (this.placesDecription) {
      this.placesDecription.forEach(async element => {
        let place: any = "";
        let lat: any = "";
        let lng: any = "";
        let distance: any = "";
        let d: any = "";
        let image: any = 'assets/imgs/image.jpg';
        let name: any = "";

        await this.apiProvider.getPlaceDetails(element['place_id']).then(
          res => {
            place = res;
            lat = place.result.geometry.location.lat || "";
            lng = place.result.geometry.location.lng || "";
            name = place.result.name;
            if (place.result.photos) {
              var photoreference = place.result.photos[0].photo_reference;
              image = this.apiProvider.getPhotoString(photoreference);
            }
          }
        );

        await this.apiProvider.getDistanceFromHome(lat, lng).then(
          res => {
            if (res['rows'][0].elements[0].duration != null) {
              distance = res['rows'][0].elements[0].duration.text
            }
          }
        );

        this.placesResultRestore = [];
        var result = {
          place: place,
          image: image,
          distance: distance,
          resource_uri: element.resource_uri,
          visited: element['visited'],
          name: name
        };
        this.placesResult.push(result);
        this.placesResultRestore.push(result);
      });
    }
  }

  getPlaceDetails(result, place_id, visited, resource_uri) {
    this.navCtrl.push(PlaceDetailsPage, { result: result, place_id: place_id, visited: visited, resource_uri: resource_uri });
  }

  restorePlaces() {
    this.placesResult = this.placesResultRestore;
  }

  ionSearchInput(ev: any) {
    this.restorePlaces();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.placesResult = this.placesResult.filter((item) => {
        if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return item;
        }
      });
    }
  }

  onSearchCancel(ev: any) {
    this.toggleSearch();
  }

  toggleSearch() {
    if (this.collapsed) {
      this.collapsed = false;
    }
    else if (this.collapsed == false) {
      this.collapsed = true;
    }
  }
}
