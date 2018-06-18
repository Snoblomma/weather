import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, DateTime, Content } from 'ionic-angular';
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
  public visited: any;
  public resource_uri: any;
  public result: any = "";
  public image: string = "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350";
  public rating: any = "-";
  public drive: any = "-";
  public photoreference: any;
  public openingHours: Array<any> = [];
  public types: any = '';
  public images: Array<any> = [];
  public navLink: any = '';
  public lat: any;
  public lng: any;
  public sat: Day;
  public sun: Day;
  public weatherCondSat: any;
  public weatherCondSun: any;
  public tempSat: any;
  public tempSun: any;
  private anyErrors: boolean;
  private finished: boolean;
  private monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  public isAtBottom: boolean;

  @ViewChild(Content) content: Content;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private apiProvider: ApiProvider,
    private ref: ChangeDetectorRef) {
    this.getPlaceDetails();
    this.initialize();
  }

  ionViewWillEnter() {
  }

  ionViewDidLoad() {
  }

  getPlaceDetails() {
    this.result = this.navParams.get('result');
    this.place_id = this.navParams.get('place_id');
    this.visited = this.navParams.get('visited');
    this.resource_uri = this.navParams.get('resource_uri');
  }

  initialize() {
    this.getWeathers();
    this.getComponents();
    this.getImage();
  }

  async getWeathers() {
    await this.apiProvider.getPlaceDetails(this.place_id).then(
      res => {
        this.lat = res['result'].geometry.location.lat;
        this.lng = res['result'].geometry.location.lng;
        this.navLink = "https://maps.google.com?saddr=Current+Location&daddr=" + this.lat + "," + this.lng;
      }
    );

    this.getWeather(this.lat, this.lng);
  }

  async getWeather(lat: string, lng: string) {
    var today = new Date().getDay();
    var sat = new Date();
    var sun = new Date();
    sat.setDate(sat.getDate() + (6 + 7 - sat.getDay()) % 7);
    sun.setDate(sat.getDate() + 1);

    await this.apiProvider.getForecastWeatherCoordinates(lat, lng, "7").then(
      res => {
        let len = res['forecast'].forecastday.length;
        let satDay = len - 1 - today;
        if (today != 0) {
          let sunDay = len - today;
          this.weatherCondSun = res['forecast'].forecastday[sunDay].day.condition.text;
          this.tempSun = res['forecast'].forecastday[sunDay].day.avgtemp_c;
          this.sun = {
            date: sun.getDate(),
            mon: this.monthNames[sun.getMonth()],
            year: sun.getFullYear(),
            icon: 'http:' + res['forecast'].forecastday[sunDay].day.condition.icon
          };
        }
        this.weatherCondSat = res['forecast'].forecastday[satDay].day.condition.text;
        this.tempSat = res['forecast'].forecastday[satDay].day.avgtemp_c;
        this.sat = {
          date: sat.getDate(),
          mon: this.monthNames[sat.getMonth()],
          year: sat.getFullYear(),
          icon: 'http:' + res['forecast'].forecastday[satDay].day.condition.icon
        };
      }
    );
  }

  getComponents() {
    if (this.result['place']) {
      // this.photoreference = this.result.place.result.photos[0].photo_reference;
      this.placeName = this.result.place.result.name;
      this.rating = this.result.place.result.rating;
      this.drive = this.result.distance;
      if (this.result.place.result['opening_hours']) {
        let oh = this.result.place.result.opening_hours.weekday_text;
        oh.forEach(element => {
          var partsOfStr = element.substr(element.indexOf(':') + 1);
          this.openingHours.push(partsOfStr);
        });
      }
      if (this.result.place.result['types']) {
        this.types = this.result.place.result.types;
      }
    }
  }

  getImage() {
    if (this.result.place.result.photos != null) {
      var max = this.result.place.result.photos.length;
      max = max < 10 ? max : 10
      for (var index = 0; index < max; index++) {
        if (this.result.place.result.photos != null) {
          var photoreference = this.result.place.result.photos[index].photo_reference;
          this.image = this.apiProvider.getPhotoString(photoreference);
          var t = this.apiProvider.getPhotoString(photoreference);
          this.images.push(this.image);
        }
      }
    }
    else {
      this.image = 'assets/imgs/image.jpg';
      this.images.push(this.image);
    }
  }

  editPlace() {
    let modal = this.modalCtrl.create(EditPlacePage, { type: "edit", place_id: this.place_id, visited: this.visited, resource_uri: this.resource_uri });
    modal.onDidDismiss(data => {
      if (data != null) {
        console.log(data);
        this.visited = data.visited;
      }
    });
    modal.present();
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

  checkTop() {
    var position: number = this.content.getScrollElement().scrollTop;
    if (position <= 250) {
      var opacity = position / 25 * 0.1;
      document.getElementById("place-header").style.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')';
    }
    else {
      document.getElementById("place-header").style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }
    this.ref.detectChanges();
  }
}

export interface Day {
  date: number,
  mon: string,
  year: number,
  icon: string
}