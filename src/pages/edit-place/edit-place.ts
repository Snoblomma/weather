import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { DataStorageProvider } from '../../providers/data-storage/data-storage';
import { PlacesPage } from '../places/places';

@IonicPage()
@Component({
  selector: 'page-edit-place',
  templateUrl: 'edit-place.html',
})
export class EditPlacePage {
  public place: any;
  public placeName: any;
  public place_id: any;
  public images: Array<any> = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    private dataStorageProvider: DataStorageProvider) {
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPlacePage');
  }

  initialize() {
    this.place = this.navParams.get('place');
    console.log(this.place);
    this.placeName = this.place.structured_formatting.main_text;
    this.place_id = this.place.place_id;

    let k: any;
    this.apiProvider.getPlaceDetails(this.place['place_id']).subscribe(res => {
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

  addPlace() {
    let visited = false;
    let placeAdded = this.isPlaceAdded(this.place_id)
    if (placeAdded) {
      this.showAlert("This place is already on your list!");
    }
    else {
      this.apiProvider.addPlace(this.place_id, name, visited);
      this.presentAddedToast();
      this.navCtrl.setRoot(PlacesPage);
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

  presentAddedToast() {
    let toast = this.toastCtrl.create({
      message: 'Place was added successfully',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
