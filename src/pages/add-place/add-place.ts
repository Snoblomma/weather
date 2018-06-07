import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  public places: Array<any> = [];
  public images: Array<any> = [];
  public selected: boolean = false;
  public selectedPlace: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  getPlaces(ev) {
    var val = ev.target.value;
    this.apiProvider.getPlaces(val).map(a => (a as Array<any>)).subscribe(
      res => { 
        this.places = res;
      });
  }

  selectPlace(place: any) {
    this.selectedPlace = place;
    this.selected = true;
    //get images
    let k: any;
    this.apiProvider.getPlaceDetails(place['place_id']).subscribe(res => {
      k = res;
      var max = k.result.photos.length;
      max = max < 10 ? max : 10
      for (var index = 0; index < max; index++) {
        var photoreference = k.result.photos[index].photo_reference;
        this.images.push(this.apiProvider.getPhotoString(photoreference));
      }
    })
  }

  appPlace() {
    this.apiProvider.addPlace(this.selectedPlace);
  }
}
