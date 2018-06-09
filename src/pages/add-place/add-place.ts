import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { DataStorageProvider } from '../../providers/data-storage/data-storage';

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
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public dataStorageProvider: DataStorageProvider) {
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
      if (k.result.photos != null) {
        var max = k.result.photos.length;
        max = max < 10 ? max : 10
        for (var index = 0; index < max; index++) {
          var photoreference = k.result.photos[index].photo_reference;
          this.images.push(this.apiProvider.getPhotoString(photoreference));
        }
      }
    })
  }

  cancelPlace() {
    this.selected = false;
    this.places = [];
  }

  addPlace() {
    let place_id = this.selectedPlace.place_id;
    let name = this.selectedPlace.structured_formatting.main_text;
    let visited = false;

    let placeAdded = this.isPlaceAdded(place_id)

    if (placeAdded) {
      this.showAlert("This place is already on your list!");
    }
    else {
      this.apiProvider.addPlace(place_id, name, visited);
      this.selected = false;
      this.navCtrl.pop();
    }
  }

  isPlaceAdded(place_id) {
    this.dataStorageProvider.places.forEach(item => {
      if (item.place_id == place_id) {
        return true;
      }
    });
    return false;
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Hey!',
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
