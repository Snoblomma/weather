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
  public placesResult: Array<{ place: any, image: string, distance: any, resource_uri: string, visited: boolean, name: string }> = [];
  public placesResultRestore: any;
  public collapsed: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public apiProvider: ApiProvider,
    public dataStorageProvider: DataStorageProvider) {
    this.initialize();
  }

  ionViewWillEnter() {
    this.initialize();
  }

  initialize() {
    this.collapsed = true;
    this.placesDecription = [];
    this.placesResult = [];
    this.dataStorageProvider.places = [];
    this.getPlaces();
  }

  getPlaces() {
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
    let lat: any;
    let lng: any;
    this.placesDecription.forEach(element => {
      placeDetails = this.apiProvider.getPlaceDetails(element['place_id']);
      placeDetails.subscribe(
        place => {
          if (place.result != null) {
            var photoreference = place.result.photos[0].photo_reference;
            var image = this.apiProvider.getPhotoString(photoreference);
            lat = place.result.geometry.location.lat;
            lng = place.result.geometry.location.lng;
            this.getDistance(lat, lng, image, element, place);
          }
        }
      );
    });
  }

  getDistance(lat, lng, image, element, place) {
    this.placesResult = [];
    this.placesResultRestore = [];
    let distanceFromHome: any;
    let distance: any = "";
    distanceFromHome = this.apiProvider.getDistanceFromHome(lat, lng);
    distanceFromHome.subscribe(
      value => {
        if (value.rows[0].elements[0].duration != null) {
          distance = value.rows[0].elements[0].duration.text;
        }
        var result = {
          place: place,
          image: image,
          distance: distance,
          resource_uri: element['resource_uri'],
          visited: element['visited'],
          name: place.result.name
        };
        this.placesResult.push(result);
        this.placesResultRestore.push(result);
      }
    );
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
