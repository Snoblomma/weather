import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { EditPlacePage } from '../edit-place/edit-place';

@IonicPage()
@Component({
  selector: 'page-place-details',
  templateUrl: 'place-details.html',
})
export class PlaceDetailsPage {
  public placeName: any = "-";
  public place_id: any;
  public resource_uri: any;
  public result: any = "";
  public image: string = "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350";
  public rating: any = "-";
  public drive: any = "-";
  public photoreference: any;
  public openingHours: any = '';
  public types: any = '';
  public images: Array<any> = [];
  public navLink: any = '';
  public lat: any;
  public lng: any;
  description: any;
  temperature: any;
  weathers: Observable<any>;
  placeDetails: Observable<any>;
  private anyErrors: boolean;
  private finished: boolean;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private apiProvider: ApiProvider) {
    this.getPlaceDetails();
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetailsPage');
  }

  getPlaceDetails() {
    this.result = this.navParams.get('result');
    this.place_id = this.navParams.get('place_id');
    this.resource_uri = this.navParams.get('resource_uri');
  }

  initialize() {
    this.getWeathers();
    this.getComponents();
    this.getImage();
  }

  getNavLink() {
    this.navLink = "https://www.google.com/maps/dir/Current+Location/" + this.lat + "," + this.lng;
  }

  getWeathers() {
    this.placeDetails = this.apiProvider.getPlaceDetails(this.place_id);
    this.placeDetails.subscribe(
      res => {
        this.lat = res.result.geometry.location.lat;
        this.lng = res.result.geometry.location.lng;
        this.photoreference = res.result.photos[0].photo_reference;
        this.getWeather(this.lat, this.lng);
        this.navLink = "https://maps.google.com?saddr=Current+Location&daddr=" + this.lat + "," + this.lng;
      }
    );


  }

  getWeather(lat: string, lng: string) {
    this.weathers = this.apiProvider.getWeatherCoordinates(lat, lng);
    this.weathers.subscribe(
      value => {
        this.description = value.weather[0].description;
        this.temperature = value.main.temp;
      },
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

  getComponents() {
    if (this.result['place']) {
      this.photoreference = this.result.place.result.photos[0].photo_reference;
      this.placeName = this.result.place.result.name;
      this.rating = this.result.place.result.rating;
      this.drive = this.result.distance;
      if (this.result.place.result['opening_hours']) {
        this.openingHours = this.result.place.result.opening_hours.weekday_text;
      }
      if (this.result.place.result['types']) {
        this.types = this.result.place.result.types;
      }

    }
  }

  getImage() {
    if (this.result['place']) {
      var max = this.result.place.result.photos.length;
      max = max < 10 ? max : 10
      for (var index = 0; index < max; index++) {
        var photoreference = this.result.place.result.photos[index].photo_reference;
        this.image = this.apiProvider.getPhotoString(photoreference);
        var t = this.apiProvider.getPhotoString(photoreference);
        this.images.push(this.image);
      }
    }
  }

  editPlace(){
    this.navCtrl.push(EditPlacePage, {place_id: this.place_id});
  }

  deletePlace() {
    this.presentToast();
    this.apiProvider.removePlace(this.resource_uri);
    this.navCtrl.pop();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.placeName + ' was removed successfully from your places.',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Delete this place?',
      message: 'Do you want to delete ' + this.placeName + ' from your places?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deletePlace();
          }
        }
      ]
    });
    confirm.present();
  }

  navigateToPlace() {
    this.navLink = "https://www.google.com/maps/dir/Current+Location/43.12345,-76.12345";
  }
}
