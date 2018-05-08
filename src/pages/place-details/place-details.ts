import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-place-details',
  templateUrl: 'place-details.html',
})
export class PlaceDetailsPage {
  public placeName: any; 
  public placeId: any;
  public result: any;
  public image: string = "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350";
  public rating: any = "-";
  public drive: any;
  public photoreference: any;
  public openingHours: any = "-";


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiProvider: ApiProvider) {
      //this.placeName = this.navParams.get('placeName');
      this.result = this.navParams.get('result');
      this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetailsPage');
  }

  initialize(){
    this.getComponents();
    this.getImage();
  }

  getComponents(){
    this.photoreference = this.result.place.result.photos[0].photo_reference;
    this.placeName = this.result.place.result.name;
    this.image = this.apiProvider.getPhotoString(this.photoreference);
    this.rating = this.result.place.result.rating;
    this.drive = this.result.distance;
    this.openingHours = this.result.place.result.opening_hours.weekday_text;
  }

  getImage(){
    let placeDetails: any;
    placeDetails = this.apiProvider.getPlaceDetails(this.placeId);
    placeDetails.subscribe(
      res => {
        var photoreference = res.result.photos[0].photo_reference;
        this.image = this.apiProvider.getPhotoString(photoreference);
      }
    );
  }
}
