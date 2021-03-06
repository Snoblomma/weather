import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { EditPlacePage } from '../edit-place/edit-place';

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
    public alertCtrl: AlertController,
    public apiProvider: ApiProvider) {
  }

  ionViewDidLoad() {
  }

  getPlaces(ev) {
    var val = ev.target.value;
    this.apiProvider.getPlaces(val).map(a => (a as Array<any>)).subscribe(
      res => {
        this.places = res;
      });
  }

  selectPlace(place_id: any) {
    this.navCtrl.push(EditPlacePage, {type:"add", place_id: place_id, visited: false});
  }
}
