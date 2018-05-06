import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  private anyErrors: boolean;
  private finished: boolean;
  public images: Array<any> = [];
  public placesDecription: Array<{ name: string, placeId: string, image: string }>;
  public placesResult: Array<{ place: any, image: string}> = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider) {
    this.placesDecription = [
      { name: "Powerscourt", placeId: "ChIJp-IbAv2mZ0gRvIV9f0y-uz0", image: "string" },
      { name: "Newbridge", placeId: "ChIJLeT0RiIaZ0gRJDhoYhpxe2Q", image: "string" },
      { name: "Irish National Stud", placeId: "ChIJDYhC3dB4XUgR-WIfHkiJzhc", image: "string" },
      { name: "Glendalough", placeId: "ChIJi1eprKqXZ0gRp73t20i0dMo", image: "string" },
      { name: "Kilruddery House", placeId: "ChIJW2Vey4-oZ0gRNKiHuxIKtcc", image: "string" }
    ]
    this.getPlaces();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  }

  getPlaces() {
    let placeDetails: any;
    this.placesDecription.forEach(element => {
      placeDetails = this.apiProvider.getPlaceDetails(element.placeId);
      placeDetails.subscribe(
        res => {
          var place: Array<any> = [];
          var photoreference = res.result.photos[0].photo_reference;
          var image = this.apiProvider.getPhotoString(photoreference);
          var result: { place: any, image: string} = {place: res, image: image};
          this.placesResult.push(result);
          place.push(res);
          place.push(image);

        }
      );
    });
  }
}
