import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ToastController, Tabs } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { SettingsProvider } from './../../providers/settings/settings';
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
  public darkTheme: boolean;
  public selectedTheme: string;
  public selectedCategories: Array<any>;
  public categories: any;
  // public categories: Array<any> = [
  //   { icon: "custom-coffee", name: "Coffee", color: "" },
  //   { icon: "custom-restaurant", name: "Restaurant", color: "" },
  //   { icon: "custom-playground", name: "Playground", color: "" },
  //   { icon: "custom-water", name: "Water", color: "" },
  //   { icon: "custom-beach", name: "Beach", color: "" },
  //   { icon: "custom-castle", name: "Castle", color: "" },
  //   { icon: "custom-airport", name: "Airport", color: "" },
  //   { icon: "custom-gym", name: "Gym", color: "" },
  //   { icon: "custom-mountain", name: "Mountain", color: "" },
  //   { icon: "custom-train", name: "Train Station", color: "" },
  //   { icon: "custom-forest", name: "Forest", color: "" },
  //   { icon: "custom-park", name: "Park", color: "" },
  //   { icon: "custom-picnic", name: "Picnic Spot", color: "" },
  //   { icon: "custom-pub", name: "Pub", color: "" },
  //   { icon: "custom-art", name: "Art", color: "" },
  //   { icon: "custom-zoopark", name: "Zoo", color: "" },
  //   { icon: "custom-historical", name: "Historical", color: "" },
  //   { icon: "custom-museum", name: "Museum", color: "" },
  //   { icon: "custom-cinema", name: "Cinema", color: "" },
  //   { icon: "custom-hike", name: "Hike", color: "" }];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    private settings: SettingsProvider) {
    this.initialize();
  }

  async initialize() {
    this.type = this.navParams.get('type');
    this.place_id = this.navParams.get('place_id');
    this.visited = this.navParams.get('visited');
    this.resource_uri = this.navParams.get('resource_uri');
    this.placeAdded = await this.isPlaceAdded(this.place_id);
    this.getTheme();
    this.getCategories();
    this.getPlaceDetails();
  }

  async getTheme() {
    this.settings.getActiveTheme().subscribe(
      val => {
        if (val == "dark-theme") {
          this.selectedTheme = "dark-theme";
        }
        else {
          this.selectedTheme = "light-theme";
        }
      });
  }

  async getCategories() {
    await this.apiProvider.getCategoriesList().then(
      res => {
        this.categories = res['objects'];
      }
    );

    this.categories.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });

    // for (let index = 0; index < this.categories.length; index++) {
    //   this.categories[index].color = this.colors[index % this.colors.length];
    // }
  }

  async getPlaceDetails() {
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
      this.apiProvider.addPlace(this.place_id, this.placeName, this.visited, this.selectedCategories);
      this.presentAddedToast();
      // going to places
      this.navCtrl.setRoot(AddPlacePage);
      var t: Tabs = this.navCtrl.parent;
      t.select(0);
    }
  }

  updatePlace() {
    this.apiProvider.updatePlace(this.resource_uri, this.place_id, this.placeName, this.visited, this.selectedCategories);
    console.log(this.selectedCategories);
    this.presentUpdatedToast();
    this.viewCtrl.dismiss({
      "visited": this.visited,
    });
  }

  async isPlaceAdded(place_id): Promise<boolean> {
    let filter: any;
    await this.apiProvider.getPlacesList().then(
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
