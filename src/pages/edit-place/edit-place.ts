import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ToastController, Tabs } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { PlacesPage } from '../places/places';
import { PlaceDetailsPage } from '../place-details/place-details';
import { AddPlacePage } from '../add-place/add-place';

@IonicPage()
@Component({
  selector: 'page-edit-place',
  templateUrl: 'edit-place.html',
})
export class EditPlacePage {
  public type: any;
  public visited: boolean;
  public resource_uri: any;
  public placeName: any;
  public place_id: any;
  public images: Array<any> = [];
  public placeAdded: boolean;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider) {
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPlacePage');
  }

  async initialize() {
    this.type = this.navParams.get('type');
    this.place_id = this.navParams.get('place_id');
    this.visited = this.navParams.get('visited');
    this.resource_uri = this.navParams.get('resource_uri');
    this.placeAdded = await this.isPlaceAdded(this.place_id);
    let placeDetails: any;

    await this.apiProvider.getPlaceDetails(this.place_id).then(
      res => {
        placeDetails = res;
        this.placeName = placeDetails.result.name;
        if (placeDetails.result.photos != null) {
          var max = placeDetails.result.photos.length;
          max = max < 10 ? max : 10
          for (var index = 0; index < max; index++) {
            var photoreference = placeDetails.result.photos[index].photo_reference;
            this.images.push(this.apiProvider.getPhotoString(photoreference));
          }
        }
      }
    );
  }

  addPlace() {
    if (this.placeAdded) {
      this.showAlert("This place is already on your list!");
    }
    else {
      this.apiProvider.addPlace(this.place_id, this.placeName, this.visited);
      this.presentAddedToast();
      // going to places
      this.navCtrl.setRoot(AddPlacePage);
      var t: Tabs = this.navCtrl.parent;
      t.select(0);
    }
  }

  updatePlace() {
    this.apiProvider.updatePlace(this.resource_uri, this.place_id, this.placeName, this.visited);
    this.presentUpdatedToast();
    this.viewCtrl.dismiss({
      "visited": this.visited,
    });
  }

  async isPlaceAdded(place_id): Promise<boolean> {
    let filter: any;
    await this.apiProvider.getPlacesListLocalBackend().then(
      res => {
        return filter = res['objects'].filter((item) => {
          if (item.place_id == place_id) {
            return true;
          }
          return false;
        });
      }
    );
    return filter.length > 0 ? true : false;
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
      message: this.placeName + ' was successfully added to your places!',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentUpdatedToast() {
    let toast = this.toastCtrl.create({
      message: 'Successfully updated ' + this.placeName + '!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
