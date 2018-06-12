import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
  public placesResult: Array<{ place: any, image: string, distance: any, resource_uri: string, name: string }> = [];
  public placesResultRestore: any;
  public distance: any;
  public lat: any;
  public lng: any;
  public collapsed: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public apiProvider: ApiProvider,
    public dataStorageProvider: DataStorageProvider) {
    this.getPlaces();
  }

  ionViewWillEnter() {
    this.getPlaces();
  }

  getPlaces() {
    this.placesDecription = [];
    this.placesResult = [];
    this.dataStorageProvider.places = [];
    let list = this.apiProvider.getPlacesListLocalBackend();
    list.subscribe(
      res => {
        let places = res['objects'];
        this.placesDecription = places;
        this.dataStorageProvider.places = places;
        this.dataStorageProvider.savePlaces();
        this.getPlacesDetails();
      }
    );
  }

  getPlacesDetails() {
    let placeDetails: any;
    this.placesDecription.forEach(element => {
      placeDetails = this.apiProvider.getPlaceDetails(element['place_id']);
      placeDetails.subscribe(
        res => {
          if (res.result != null) {
            var photoreference = res.result.photos[0].photo_reference;
            this.lat = res.result.geometry.location.lat;
            this.lng = res.result.geometry.location.lng;
            var image = this.apiProvider.getPhotoString(photoreference);

            this.placesResult = [];
            this.placesResultRestore = [];
            let t: any;
            t = this.apiProvider.getDistanceFromHome(this.lat, this.lng);
            t.subscribe(
              value => {
                this.distance = value.rows[0].elements[0].duration.text;
                let name = res.result.name;
                var result = { place: res, image: image, distance: this.distance, resource_uri: element.resource_uri, name: name};
                this.placesResult.push(result);
                this.placesResultRestore.push(result);
              }
            );
          }
        }
      );
    });
  }

  getPlaceDetails(result, place_id, resource_uri) {
    this.navCtrl.push(PlaceDetailsPage, { result: result, place_id: place_id, resource_uri: resource_uri });
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
    if (this.placesResult.length > 0) {
    }
  }

  addPlace() {
    this.navCtrl.push(AddPlacePage);
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
